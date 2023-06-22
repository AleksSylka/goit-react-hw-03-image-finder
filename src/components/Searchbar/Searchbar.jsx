import { Component } from "react";
import { SearchbarForm, SearchbarBtn, SearchbarInput, SearchbarTop } from "./Searchbar.styled.jsx";
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';

class Searchbar extends Component {
    state = {
        inputData: '',
    }

    handleChange = event => {
        this.setState({[event.currentTarget.name]: event.currentTarget.value})
    }

    formSubmit = (event) => {
        event.preventDefault();
        if (this.state.inputData === '') {
            return toast(`Enter your search data`);
        }
        this.props.onSubmit(this.state.inputData);
        this.reset();
    }

    reset = () => {
        this.setState({ inputData: '' });
    };
    

    render() {
        return (
            <SearchbarTop onSubmit={this.formSubmit}>
                <SearchbarForm>
            
                    <SearchbarBtn type="submit" className="button">
                        <FcSearch size='100%'/>
                    
                </SearchbarBtn>

                <SearchbarInput
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="inputData"
                    onChange={this.handleChange}
                    value={this.state.inputData}
                />
            </SearchbarForm>
        </SearchbarTop>)
    }
}

export default Searchbar;