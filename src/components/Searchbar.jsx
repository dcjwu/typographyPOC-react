import Input from "./_UI/Input";
import Button from "./_UI/Button";

const Searchbar = () => {
    return (
        <form className='d-flex search mt-4'>
            <Input type='text' placeholder='Search'/>
            <Button type='submit'>
                Search
            </Button>
        </form>
    )
}

export default Searchbar