import Card from "./Card";

export function YourStocks({isLoggedIn, setShowLogSignUpPopup}) {

    if (!isLoggedIn) {
        return (
        <>
            <button onClick={() => setShowLogSignUpPopup(true)}>Login to see your Subscriptions</button>
        </>
    )
    }

    return (
        <></>
    )
    
}