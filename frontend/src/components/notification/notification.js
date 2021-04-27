import { notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const notificationComponent = (errors) => {
  errors.forEach((error) => {
    notification.open({
      icon: <WarningOutlined style={{ color: 'red' }} />,
      message: 'Error',
      description: error.message
    });
  });
};

export default notificationComponent;
