  //
  // Copyright (c) 2022-2024 Winlin
  //
  // SPDX-License-Identifier: MIT
  //
  import {useSearchParams} from "react-router-dom";
  import {Container, Tabs, Tab} from "react-bootstrap";
  import React from "react";
  import ScenarioLiveStreams from './ScenarioLive';
  import useUrls from "../components/UrlGenerator";
  import ScenarioForward from './ScenarioForward';
  import {SrsErrorBoundary} from "../components/SrsErrorBoundary";
  import ScenarioTutorials from './ScenarioTutorials';
  import {useTranslation} from "react-i18next";
  import {useSrsLanguage} from "../components/LanguageSwitch";
  import ScenarioRecord from "./ScenarioRecord";
  import ScenarioVLive from "./ScenarioVLive";
  import {ScenarioVxOthers} from "./ScenarioOthers";
  import ScenarioTranscode from "./ScenarioTranscode";
  import ScenarioTranscript from "./ScenarioTranscript";
  import ScenarioLiveRoom from "./ScenarioLiveRoom";
  import ScenarioCamera from "./ScenarioCamera";
  import ScenarioDubbing from "./ScenarioDubbing";
  import ScenarioOCR from "./ScenarioOCR";

  export default function Scenario() {
    const [searchParams] = useSearchParams();
    const [defaultActiveTab, setDefaultActiveTab] = React.useState();
    const language = useSrsLanguage();

    React.useEffect(() => {
      const tab = searchParams.get('tab') || 'tutorials';
      console.log(`?tab=tutorials|live|stream|record|vlive|camera|transcode|transcript|others, current=${tab}, Select the tab to render`);
      setDefaultActiveTab(tab);
    }, [searchParams, language]);

    return (
      <SrsErrorBoundary>
        { defaultActiveTab && <ScenarioImpl {...{defaultActiveTab}} /> }
      </SrsErrorBoundary>
    );
  }

  function ScenarioImpl({defaultActiveTab}) {
    const [activeTab, setActiveTab] = React.useState(defaultActiveTab);
    const setSearchParams = useSearchParams()[1];
    const {t} = useTranslation();
    const urls = useUrls();

    const onSelectTab = React.useCallback((k) => {
      setSearchParams({'tab': k});
      setActiveTab(k);
    }, [setSearchParams, setActiveTab]);

    return (
      <>
        <p></p>
        <Container fluid>
          <Tabs defaultActiveKey={activeTab} id="tab0" className="mb-3" onSelect={(k) => onSelectTab(k)}>
            <Tab eventKey="live" title={t('scenario.live')} disabled={true}>
              {activeTab === 'live' && <ScenarioLiveStreams {...{urls}} />}
            </Tab>
            <Tab eventKey="stream" title={t('scenario.stream')} disabled={true}>
              {activeTab === 'stream' && <ScenarioLiveRoom/>}
            </Tab>
            <Tab eventKey="forward" title={t('scenario.forward')} disabled={true}>
              {activeTab === 'forward' && <ScenarioForward/>}
            </Tab>
            <Tab eventKey="record" title={t('scenario.record')} disabled={true}>
              {activeTab === 'record' && <ScenarioRecord/>}
            </Tab>
            <Tab eventKey="vlive" title={t('scenario.vlive')}>
              {activeTab === 'vlive' && <ScenarioVLive/>}
            </Tab>
            <Tab eventKey="camera" title={t('scenario.camera')} disabled={true}>
              {activeTab === 'camera' && <ScenarioCamera/>}
            </Tab>
            <Tab eventKey="transcode" title={t('scenario.transcode')} disabled={true}>
              {activeTab === 'transcode' && <ScenarioTranscode {...{urls}} />}
            </Tab>
            <Tab eventKey="transcript" title={t('transcript.title')} disabled={true}>
              {activeTab === 'transcript' && <ScenarioTranscript/>}
            </Tab>
            <Tab eventKey="dubbing" title={t('dubb.title')} disabled={true}>
              {activeTab === 'dubbing' && <ScenarioDubbing/>}
            </Tab>
            <Tab eventKey="ocr" title={t('ocr.title')} disabled={true}>
              {activeTab === 'ocr' && <ScenarioOCR/>}
            </Tab>
            <Tab eventKey="others" title={t('scenario.others')} disabled={true}>
              {activeTab === 'others' && <ScenarioVxOthers {...{urls}} />}
            </Tab>
          </Tabs>
        </Container>
      </>
    );
  }
