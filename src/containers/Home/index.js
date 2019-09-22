import React from 'react';
import {Filter} from "../../components/Filter";
import {Listing} from '../../components/Listing';
import {Preloader} from "../../components/Preloader";
import {API_URL, listing} from "../../constants";

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

    state = {
        users: [],
        startDate: '2019-01-01T09:00',
        endDate: '2020-01-01T18:00',
        textFilter: '',
        perPage: listing.COUNT_PER_PAGE,
        page: 1,
        count: null,
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers(e) {
        e && e.preventDefault();
        return fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                textFilter: this.state.textFilter,
                perPage: this.state.perPage,
                page: this.state.page,
            }),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                this.setState({
                    users: result.data,
                    isLoading: false,
                    count: result.count,
                });
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    }

    setTextFilterValue(e) {
        this.setState({textFilter: e.target.value});
    }

    setStartDate(e) {
        this.setState({startDate: e.target.value});
    }

    setEndDate(e) {
        this.setState({endDate: e.target.value});
    }

    onClickPrevPage() {
        this.setState({
            users: [],
            count: null,
            page:  Math.max(1, this.state.page - 1),
        }, this.getUsers);
    }

    onClickNextPage() {
        this.setState({
            users: [],
            count: null,
            page: this.state.page + 1,
        }, this.getUsers);
    }

    render() {
        return (
            <React.Fragment>
                <Filter onClickSearch={this.getUsers} usersPerPage={this.state.perPage} page={this.state.page}
                        onSetTextFilterValue={this.setTextFilterValue} textFilterValue={this.state.textFilter}
                        onSetStartDate={this.setStartDate} startDate={this.state.startDate}
                        onSetEndDate={this.setEndDate} endDate={this.state.endDate}
                />
                {this.state.count === null ? <Preloader/> :
                    <Listing perPage={this.state.perPage} page={this.state.page} count={this.state.count}
                             items={this.state.users}
                             onClickPrevPage={this.onClickPrevPage}
                             onClickNextPage={this.onClickNextPage}/>}
            </React.Fragment>
        );
    }
}


export {Home};
