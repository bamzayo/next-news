import Styles from "../styles/EOM.module.css";
import { Toolbar } from "../components/toolbar";

export const EOM = ({ employee }) => {
    return (
        <div className="page-container">
            <Toolbar />
            <div className={Styles.main}>
                <h1>Employee of the month</h1>

                <div className={Styles.emp}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <img src={employee.image} />
                    <p>{employee.description}</p>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (pageContent) => {
    const apiResponse = await fetch(
        "https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth"
    );
    const employee = await apiResponse.json();
    return {
        props: {
            employee,
        },
    };
};

export default EOM;
