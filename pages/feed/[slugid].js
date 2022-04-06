import styles from "../../styles/feed.module.css";
import { Toolbar } from "../../components/toolbar";
import { useRouter } from "next/router";

export const Feed = ({ pageNumber, articles }) => {
    const router = useRouter();
    return (
        <div className="page-container">
            <Toolbar />
            <div className={styles.main}>
                {articles.map((a, i) => {
                    return (
                        <div key={i} className={styles.post}>
                            <h1 onClick={() => (window.location.href = a.url)}>
                                {a.title}
                            </h1>
                            <p>{a.description}</p>
                            {!!a.urlToImage && <img src={a.urlToImage} />}
                        </div>
                    );
                })}
            </div>
            <div className={styles.paginator}>
                <div
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`);
                        }
                    }}
                    className={
                        pageNumber === 1 ? styles.disabled : styles.active
                    }
                >
                    Previous Page
                </div>
                <div>#{pageNumber}</div>
                <div
                    onClick={() => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber + 1}`);
                        }
                    }}
                    className={
                        pageNumber === 5 ? styles.disabled : styles.active
                    }
                >
                    Next Page
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (pageContext) => {
    const pN = pageContext.query.slugid;

    if (!pN || pN < 1 || pN > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            },
        };
    }

    const apiRes = await fetch(
        `https://newsapi.org/v2/top-headlines?country=ng&pageSize=5&page=${pN}`,
        {
            headers: {
                Authorization: "Bearer 6e2e253d10db402daa0cdb024563c316",
            },
        }
    );
    const apiJson = await apiRes.json();
    const { articles } = apiJson;
    return {
        props: { pageNumber: Number.parseInt(pN), articles },
    };
};

export default Feed;
