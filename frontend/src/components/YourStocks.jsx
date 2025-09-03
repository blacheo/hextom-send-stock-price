import { useEffect, useState } from "react";

export function YourStocks({isLoggedIn, setShowLogSignUpPopup}) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

    }, [])

    if (!isLoggedIn) {
        return (
        <>
            <button onClick={() => setShowLogSignUpPopup(true)}>Login to see your Subscriptions</button>
        </>
    )
    }

    if (isLoading) {
        return (
            <>Subscriptions are Loading...</>
        )
    }

    return (
        <></>
    )
    
}