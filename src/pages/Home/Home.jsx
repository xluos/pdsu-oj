import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './components/IntroBanner';
import RankList from './components/RankList';
import './Home.scss';

const data = {
  title: '解题榜',
  bgcolor: 'red',
  head: [
    {key: 'user',name: '用户'},
    {key: 'rank',name: '段位'},
    {key: 'info',name: '信息'}
  ],
  body: [
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'},
    {user: '啦啦啦', rank: '王者', info: '平顶山'}
  ]
}
data.body = data.body.map((item) => ({
  ...item,
  rank: (<a>{item.rank}</a>)
}))
export default function Home () { return (
  <div className="home-page" >
    <Banner></Banner>
    <div className="home-page--content">
      <div className="home-page--btn-group">
        <Link to="/problem">
          <div className="problem-link">
            <img src={require('./images/problem-icon.png')} />
            <div className="content">
              <h4>题目</h4>
              <p>挑战别人也是挑战自己</p>
            </div>
          </div>
        </Link>
        <Link to="/competition">
          <div className="competition-link">
            <img src={require('./images/contest-icon.png')} />
            <div className="content">
              <h4 className='new'>比赛</h4>
              <p>探讨 0 和 1 的无限可能</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="home-page--rank-group">
        <RankList {...data} bgcolor="#419ff7"/>
        <RankList {...data} bgcolor="#ffb016"/>
        <RankList {...data}/>
      </div>
    </div>
  </div>
);}
