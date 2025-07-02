import React, { memo } from 'react';
import { Card, Row, Col } from 'antd';

const Analytics = memo(({ data }) => (
  <Row gutter={[24, 24]}>
    {data.map((item, idx) => (
      <Col key={idx} xs={24} sm={12} md={6}>
        <Card className='shadow-md rounded-lg' style={{ minHeight: 120 }}>
          <div className='flex justify-between items-center h-full'>
            <div>
              <div className='text-2xl font-bold'>{item.value}</div>
              <div className='text-gray-500 mt-2'>{item.label}</div>
            </div>
            <div
              className='flex items-center justify-center rounded-full'
              style={{
                background: item.iconBg || '#f5f5f5',
                width: 40,
                height: 40,
              }}
            >
              {item.icon}
            </div>
          </div>
        </Card>
      </Col>
    ))}
  </Row>
));

export default Analytics;
