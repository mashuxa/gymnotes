import React from 'react';
import {FilterDate} from "../../components/FilterDate";
import {FilterCategory} from '../../components/FilterCategory'
import {FilterContractor} from '../../components/FilterContractor'
import {Preloader} from '../../components/Preloader';
import {API_URL} from "../../constants";
import {ContractorCard} from "../../components/ContractorCard";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading: true,
        users: [],
        startDate: '',
        endDate: '',
        categoriesId: [],
        textFilter: '',
        perPage: 2,
        page: 1,
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        const url = `${API_URL}/users`;
        const filterParameters = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            categoriesId: this.state.categoriesId,
            textFilter: this.state.textFilter,
            perPage: this.state.perPage,
            page: this.state.page,
        };

        this.setState({
            isLoading: true,
        });

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
                });
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    }

    render() {
        const users = this.state.users.map((user, i) => {
            return <ContractorCard key={i} data={user}/>;
        });
        return (
            <React.Fragment>
                {/*<FilterDate/>*/}
                {/*<FilterCategory/>*/}
                {/*<FilterContractor/>*/}
                {this.state.isLoading ? <Preloader/> : users}
            </React.Fragment>
        );
    }
}


export {Home};
