import ErrorPage from './ErrorPage';

export default function Error404() {
    return (
        <ErrorPage 
            status={404}
            title="Page Not Found"
            description="Oops! The page you're looking for doesn't exist."
        />
    );
}