import ErrorPage from './ErrorPage';

export default function Error503() {
    return (
        <ErrorPage 
            status={503}
            title="Service Unavailable"
            description="Sorry, we're doing some maintenance. Please check back soon."
        />
    );
}