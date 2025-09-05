import { useEffect, useState } from "react"
import { Newspaper } from "lucide-react"

import {API} from '../../utilities/constants';
import NewsCard from "./NewsCard";

export default function News() {
    const [error, setError] = useState(null);
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const getNews = async () => {
            try {
                let response = await API.get("news/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                setError(null);
                setNewsArticles(response.data)
            } catch (err) {
                setError("Failed to fetch news");
                console.log(err)
            }
        }
        if (!token) {
            setError("No token found. Please log in.");

        } else {
            getNews()
        }


    }, [])

    if (error) {
        return (
            <NoNewsCard>
                <p className="text-sm text-red-500">
                    {error}
                </p>
            </NoNewsCard>)
    }

    if (newsArticles.length == 0) {
        return (
            <NoNewsCard>
                <p className="text-sm text-gray-500">
                    We couldn’t find any recent articles for stocks that you're subscribed to.
                    Check back later for updates.
                </p>
            </NoNewsCard>)
    }

    return (
        <>
            {newsArticles.map(article => <NewsCard key={article.uuid} article={article}/>)}
        </>
    )
}

function NoNewsCard({ children }) {
    return (
        <div className="w-full max-w-md rounded-2xl border border-dashed bg-white shadow-sm p-6 flex flex-col items-center justify-center gap-3 text-center">
            <Newspaper size={42} className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-700">
                No News Available
            </h2>
            {children}
        </div>
    )
}