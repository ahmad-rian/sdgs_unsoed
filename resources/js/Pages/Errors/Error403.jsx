import ErrorPage from './ErrorPage';

export default function Error403() {
    return (
        <ErrorPage 
            status={403}
            title="Forbidden"
            description="Sorry, you don't have permission to access this page."
        />
    );
}