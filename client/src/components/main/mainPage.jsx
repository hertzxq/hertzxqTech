import Header from "./header"
import Main from "./main"
import Footer from "./footer"
import { data } from "../datas/data"

export default function MainPage() {
    return (
        <>
            <Header />
            <Main {...data[0]}/>
            <Footer />
        </>
    )
}