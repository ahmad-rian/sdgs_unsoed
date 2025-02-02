import ErrorPage from './ErrorPage';

export default function Error429() {
    return (
        <ErrorPage 
            status={429}
            title="Too Many Requests"
            description="Whoa! Please slow down and try again later."
        />
    );
}