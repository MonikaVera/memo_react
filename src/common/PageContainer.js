import { ContentContainer, BackgroundContainer } from "../pages/styles/styles";

const PageContainer = ({children}) => {
    return <div>
        <BackgroundContainer/>
        <ContentContainer className="container">
            {children}
        </ContentContainer>
    </div>
}

export default PageContainer;