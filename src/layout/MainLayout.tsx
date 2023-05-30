import { FC } from "react"
import { Container, Box } from "@mui/material"
import { DrawerAppBar } from "../ui/Navbar"

interface Props {
    children: React.ReactNode
}


export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <DrawerAppBar />
            <Container sx={{
                paddingTop: 8,
                minHeight: '100vh',
                marginTop: 2,
                width: "100%"
            }}>
                {children}
            </Container>

        </>
    )
}
