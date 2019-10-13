import React from 'react';
import {Filter} from "../../components/Filter";
import {Listing} from '../../components/Listing';
import {Preloader} from "../../components/Preloader";
import {API_URL} from "../../constants";
import * as actions from '../../actions';
import {connect} from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.getUsers = this.getUsers.bind(this);
        this.setTextFilterValue = this.setTextFilterValue.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.onClickPrevPage = this.onClickPrevPage.bind(this);
        this.onClickNextPage = this.onClickNextPage.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers(e) {
        e && e.preventDefault();

        const state = this.props.store.getState().homePageReducer;

        this.props.store.dispatch(actions.setListingData({
            users: [],
            isLoading: true,
            count: null,
        }));

        fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                startDate: state.startDate,
                endDate: state.endDate,
                textFilter: state.textFilter,
                perPage: state.perPage,
                page: state.page,
            }),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                this.props.store.dispatch(actions.setListingData({
                    users: result.data,
                    isLoading: false,
                    count: result.count,
                }));
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    }

    setTextFilterValue(e) {
        this.props.store.dispatch(actions.setListingData({textFilter: e.target.value}));
    }

    setStartDate(e) {
        this.props.store.dispatch(actions.setListingData({startDate: e.target.value}));
    }

    setEndDate(e) {
        this.props.store.dispatch(actions.setListingData({endDate: e.target.value}));
    }

    onClickPrevPage() {
        this.props.store.dispatch(actions.setListingData({
            users: [],
            count: null,
            page: Math.max(1, this.props.page - 1),
        }));
        this.getUsers();
    }

    onClickNextPage() {
        this.props.store.dispatch(actions.setListingData({
            users: [],
            count: null,
            page: Math.max(1, this.props.page + 1),
        }));
        this.getUsers();
    }

    render() {
        return (
            <React.Fragment>
                <Filter onClickSearch={this.getUsers} usersPerPage={this.props.perPage} page={this.props.page}
                        onSetTextFilterValue={this.setTextFilterValue} textFilterValue={this.props.textFilter}
                        onSetStartDate={this.setStartDate} startDate={this.props.startDate}
                        onSetEndDate={this.setEndDate} endDate={this.props.endDate}
                />
                {this.props.count === null ? <Preloader/> :
                    <Listing perPage={this.props.perPage} page={this.props.page} count={this.props.count}
                             items={this.props.users}
                             onClickPrevPage={this.onClickPrevPage}
                             onClickNextPage={this.onClickNextPage}/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.homePageReducer.count,
        endDate: state.homePageReducer.endDate,
        isLoading: state.homePageReducer.isLoading,
        page: state.homePageReducer.page,
        perPage: state.homePageReducer.perPage,
        startDate:state.homePageReducer.startDate,
        textFilter: state.homePageReducer.textFilter,
        users: state.homePageReducer.users,
    };
};

export default connect(mapStateToProps)(Home);
