import React from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import BecomeACoachPane from "../../components/user/Coach/BecomeACoachPane";

export default function NewCoachPage() {
    return <Layout
        header={<Header />}
        main={
            <BecomeACoachPane />
        }
        isMainFull
    />
}