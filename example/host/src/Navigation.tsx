
import {
    GroupOutlined,
    HomeOutlined,
    SettingOutlined,
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  import { Menu } from 'antd';
  import { Link } from 'react-router-dom';
  
  function Navgation() {
  
    const items: MenuProps['items'] = [
      {
        label: <Link to="/">Home</Link>,
        key: '/',
        icon: <HomeOutlined />,
      },
      {
        label: 'Remote1',
        key: '/remote1',
        icon: <SettingOutlined />,
        children: [
          {
            type: 'group',
            label: 'Sub Router',
            children: [
              {
                label: (
                  <Link to="/remote1" className="menu-remote1-home-link">
                    Home
                  </Link>
                ),
                key: 'remote1:setting:1',
              },
              {
                label: (
                  <Link to="/remote1/detail" className="menu-remote1-detail-link">
                    Detail
                  </Link>
                ),
                key: 'remote1:setting:2',
              },
            ],
          },
        ],
      },
      {
        label: 'Remote2',
        key: '/remote2',
        icon: <SettingOutlined />,
        children: [
          {
            type: 'group',
            label: 'Sub Router',
            children: [
              {
                label: (
                  <Link to="/remote2" className="menu-remote1-home-link">
                    Home
                  </Link>
                ),
                key: 'remote2:setting:1',
              },
              {
                label: (
                  <Link to="/remote2/detail" className="menu-remote1-detail-link">
                    Detail
                  </Link>
                ),
                key: 'remote2:setting:2',
              },
            ],
          },
        ],
      },
    //   {
    //     label: <Link to="/remote2">Remote2</Link>,
    //     key: '/remote2',
    //     icon: <GroupOutlined />,
    //     children: [
    //       {
    //         type: 'group',
    //         label: 'Sub Router',
    //         children: [
    //           {
    //             key: 'setting:1',
    //             label: (
    //               <Link
    //                 to="/remote2"
    //                 className="menu-remote2-home-link"
    //                 //  onClick={() => Info.setInitialEntrie("/")}
    //               >
    //                 Home
    //               </Link>
    //             ),
    //           },
    //           {
    //             key: 'setting:2',
    //             label: (
    //               <Link
    //                 to="/remote2/detail"
    //                 className="menu-remote2-detail-link"
    //                 // onClick={() => Info.setInitialEntrie("/detail")}
    //               >
    //                 Detail
    //               </Link>
    //             ),
    //           },
    //         ],
    //       },
    //     ],
    //   },
    ];
  
    return (
      <Menu
        className="host-menu"
        mode="horizontal"
        items={items}
      />
    );
  }
  
  export default Navgation;
  
