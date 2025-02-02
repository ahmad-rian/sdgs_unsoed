import ErrorPage from './ErrorPage';

export default function Error500() {
    return (
        <ErrorPage 
            status={500}
            title="Server Error"
            description="Oops! Something went wrong on our end."
        />
    );
}