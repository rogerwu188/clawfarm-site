import Hero from './components/home/Hero'
import AgentCommerce from './components/home/AgentCommerce'
import Marketplace from './components/home/Marketplace'
import HowItWorks from './components/home/HowItWorks'
import Roles from './components/home/Roles'
import Why from './components/home/Why'
import Mining from './components/home/Mining'
import PoweredDemandApps from './components/home/PoweredDemandApps'
import Explore from './components/home/Explore'

export default function Home() {
  return (
    <main>
      <Hero />
      <AgentCommerce />
      <Marketplace />
      <HowItWorks />
      <Roles />
      <Why />
      <Mining />
      <PoweredDemandApps />
      <Explore />
    </main>
  )
}
