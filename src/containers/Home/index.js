import React from 'react';
import {Filter} from "../../components/Filter";
import {Preloader} from '../../components/Preloader';
import {API_URL} from "../../constants";
import {ContractorCard} from "../../components/ContractorCard";
import {Pagination} from "../../components/Pagination";

// @todo: move to constants
const COUNT_PER_PAGE = 3;

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
        isLoading: true,
        users: [],
        startDate: '2019-01-01T09:00',
        endDate: '2020-01-01T18:00',
        textFilter: '',
        perPage: COUNT_PER_PAGE,
        page: 1,
        count: null,
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers(e, page) {
        e && e.preventDefault();

        const url = `${API_URL}/users`;
        const filterParameters = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            textFilter: this.state.textFilter,
            perPage: this.state.perPage,
            page: this.state.page,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(filterParameters),
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
            page: Math.max(1, this.state.page - 1),
            users: [],
            isLoading: true,
        });
        this.getUsers();
    }

    onClickNextPage() {
        this.setState({
            page: this.state.page + 1,
            users: [],
            isLoading: true,
        });
        this.getUsers();
    }

    render() {
        console.log(this.state.page);
        return (
            <React.Fragment>
                <Filter onClickSearch={this.getUsers} usersPerPage={this.state.perPage} page={this.state.page}
                        onSetTextFilterValue={this.setTextFilterValue} textFilterValue={this.state.textFilter}
                        onSetStartDate={this.setStartDate} startDate={this.state.startDate}
                        onSetEndDate={this.setEndDate} endDate={this.state.endDate}
                />
                <Pagination count={this.state.count} page={this.state.page} perPage={this.state.perPage}
                            onClickPrevPage={this.onClickPrevPage} onClickNextPage={this.onClickNextPage}/>
                {this.state.isLoading ? <Preloader/> : this.state.users.map((user, i) => <ContractorCard key={i}
                                                                                                         data={user}/>)}
            </React.Fragment>
        );
    }
}


export {Home};
