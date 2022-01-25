import { Trans } from '@lingui/macro';
import Container from '@mui/material/Container';
import * as React from 'react';

import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { HealthFactorNumber } from '../src/components/HealthFactorNumber';
import { HFInfoContent } from '../src/components/infoModalContents/HFInfoContent';
import { FormattedNumber } from '../src/components/primitives/FormattedNumber';
import { NoData } from '../src/components/primitives/NoData';
import { TextWithModal } from '../src/components/TextWithModal';
import { TopInfoPanel } from '../src/components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../src/components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../src/hooks/app-data-provider/useAppDataProvider';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';

export default function Home() {
  const { currentAccount } = useWeb3Context();
  const { user } = useAppDataContext();

  return (
    <Container maxWidth="lg">
      <TopInfoPanel pageTitle={<Trans>Dashboard</Trans>} withMarketSwitcher>
        <TopInfoPanelItem title={<Trans>Net worth</Trans>}>
          {currentAccount ? (
            <FormattedNumber value={Number(user?.netWorthUSD || 0)} symbol="USD" variant="main21" />
          ) : (
            <NoData variant="secondary21" sx={{ opacity: '0.7' }} />
          )}
        </TopInfoPanelItem>
        <TopInfoPanelItem title={<Trans>Net APY</Trans>}>
          {currentAccount ? (
            <FormattedNumber
              value={((user?.earnedAPY || 0) - (user?.debtAPY || 0)) / 100}
              variant="main21"
              percent
            />
          ) : (
            <NoData variant="secondary21" sx={{ opacity: '0.7' }} />
          )}
        </TopInfoPanelItem>

        {currentAccount && user?.healthFactor !== '-1' && (
          <TopInfoPanelItem
            title={
              <TextWithModal
                text={<Trans>Health factor</Trans>}
                iconSize={13}
                iconColor="#FFFFFF3B"
                withContentButton
              >
                <HFInfoContent />
              </TextWithModal>
            }
          >
            <HealthFactorNumber value={user?.healthFactor || '-1'} variant="main21" />
          </TopInfoPanelItem>
        )}
      </TopInfoPanel>

      {!currentAccount && <ConnectWalletPaper />}
    </Container>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
