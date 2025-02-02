import ErrorPage from './ErrorPage';

export default function Error419() {
    return (
        <ErrorPage 
            status={419}
            title="Page Expired"
            description="Sorry, your session has expired. Please refresh and try again."
        />
    );
}