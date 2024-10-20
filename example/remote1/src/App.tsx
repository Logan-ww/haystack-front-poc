import { Image } from 'antd';
// @ts-ignore
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import ReactShadow, { useShadowRoot } from 'react-shadow';
import { Table } from 'antd';

const DetailDev = styled.div`
  color: red;
`;

const dataSource = [
  {
    key: '1',
    name: 'Zack',
    age: 32,
    address: 'Wellington',
  },
  {
    key: '2',
    name: 'Jack',
    age: 42,
    address: 'Auckland',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

function Home({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h2>Remote1 home page</h2>
      <h3>
        name: {name}, age: {age}
      </h3>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

function Detail() {
  return (
    <DetailDev>
      <h2>Remote1 detail page</h2>
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </DetailDev>
  );
}

const App = (info: { name: string; age: number; containerApp?: ShadowRoot}) => {
  const container = info.containerApp ?? info.containerApp;
  return (
    <StyleProvider
      container={container}
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <BrowserRouter basename="/">
        <ul>
          <li>
            <Link to="/" className="self-remote1-home-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/detail" className="self-remote1-detail-link">
              Detail
            </Link>
          </li>
        </ul>

        <Routes>
          <Route path="/home" element={<Home name={info.name} age={info.age}/>}>
          </Route>
          <Route path="/detail" element={<Detail/>}>
          </Route>
          <Route path="/" element={<Home name={info.name} age={info.age}/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </StyleProvider>
  );
};

// function WrapApp(info: any) {
//   return (
//     // <ReactShadow.div>
//     <App />
//     // </ReactShadow.div>
//   );
// }

export default App;