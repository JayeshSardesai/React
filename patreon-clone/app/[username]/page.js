import PaymentPage from '@/components/PaymentPage';

export default async function Username(props) {
    const { params } = await props;
    return (
        <>
            <PaymentPage username={params.username} />
        </>
    );
}
