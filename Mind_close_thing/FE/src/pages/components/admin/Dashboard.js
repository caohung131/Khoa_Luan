import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Card,
  Popconfirm,
  Radio,
  Space,
  Statistic,
  Table,
  Typography,
} from "antd";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { createApiPjc } from "../../../services";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [statistical, setStatistical] = useState(2);

  useEffect(() => {
    createApiPjc()
      .get("http://localhost:8000/user")
      .then((response) => setCustomers(response.data.countUser)) // Api đếm user
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    createApiPjc()
      .get("http://localhost:8000/admin/order/all")
      .then((response) => setOrders(response.data.orders.length)) // đếm số order
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    createApiPjc()
      .get("http://localhost:8000/product")
      .then((response) => setInventory(response.data.products.length)) // đếm số lượng sản phẩm
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    createApiPjc()
      .get("http://localhost:8000/admin/order-year?year=") // tính tổng doanh thu năm
      .then((response) => setRevenue(response.data.sumTotal))
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <Space size={30} direction="vertical">
      <Typography.Title level={4}>Thống kê</Typography.Title>
      <Space size={80} direction="horizontal">

        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tổng số đơn năm"}
          value={orders}
        />

        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tổng số sản phẩm"}
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tổng người dùng"}
          value={customers}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Doanh thu (VND)"}
          value={revenue}
        />
      </Space>

    
      
      <Space>
        <h3>Thống kê: </h3>
        <Radio.Group
          value={statistical}
          onChange={(e) => setStatistical(e.target.value)}
        >
          <Radio.Button value="1">Theo năm</Radio.Button>
          <Radio.Button value="2">Theo tháng</Radio.Button>
          <Radio.Button value="3">Theo ngày</Radio.Button>
        </Radio.Group>
      </Space>
      <Space size={100} direction="horizontal">
        {statistical == 2 ? <DashboardChart /> : null}
        {statistical == 2 ? <RevenueChart /> : null}
        {statistical == 1 ? <YearlyOrderChart /> : null}
        {statistical == 1 ? <YearlyRevenueChart /> : null}
        {statistical == 3 ? <DailyOrderChart /> : null}
        {statistical == 3 ? <DailyRevenueChart /> : null}
      </Space>
      <Space size={100} direction="horizontal">
        {statistical == 3 ? <DailyUserChart /> : null}
        {statistical == 1 ? <YearlyUserChart /> : null}
        {statistical == 2 ? <MonthlyUserChart /> : null}
        <RecentOrders />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const transformData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        key: item._id,
      };
    });
  };


  //api lấy order ngày
  useEffect(() => {
    createApiPjc()
      .get(`http://localhost:8000/admin/order-today`)
      .then((response) => setOrders(response.data.orderToday))
      .catch((error) => console.error("Error:", error));
  }, []);

  // console.log(orders)
  const deleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast({
        status: "success",
        title: "Xoá đơn hàng thành công",
        position: "top",
      });
      setOrders(orders.filter((item) => item._id != id));
    } catch (error) {
      toast({
        status: "error",
        title: "Delete order failed",
        position: "top",
      });
    }
  };
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (value) => (
          <>
            <img
              width={40}
              height={40}
              src={value}
              onError={(e) =>
                (e.target.src =
                  "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
              }
            />
          </>
        ),
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={record.orderDetail}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Pay",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text) => <a>{text === false ? "Un Paid" : "Paid"}</a>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa đơn"
            description="Bạn có chắc chăn xóa?"
            onConfirm={() => {}}
          >
            <a style={{ color: "red" }}>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3>Đơn đặt hàng gần đây</h3>
      {orders && (
        <Table
          columns={columns}
          dataSource={transformData(orders)}
          expandable={{ expandedRowRender }}
        />
      )}
    </>
  );
}

function DashboardChart() {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Orders",
            data: [],
            backgroundColor: "rgba(0, 255, 77, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const month of months) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/order-month?month=${month}`
        );

        // console.log(response);
        const result = response;
        chartData.labels.push(`Tháng ${month}`);
        chartData.datasets[0].data.push(result.data.countOrderMonth || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Số Lượng Đơn Hàng Theo Tháng</h2>
      <Bar data={data} />
    </div>
  );
}

//order tháng
const RevenueChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Revenue",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const month of months) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/order-month?month=${month}`
        );
        const result = await response;
        chartData.labels.push(`Tháng ${month}`);
        chartData.datasets[0].data.push(result.data.sumTotal || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Doanh Thu Theo Tháng</h2>
      <Bar data={data} />
    </div>
  );
};


//order Năm
const YearlyRevenueChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

    //tạo hàm lấy data
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 4 },
        (_, index) => currentYear - index
      );
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Doanh thu VND",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const year of years) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/order-year?year=${year}`
        );
        const result = await response;
        chartData.labels.push(`Năm ${year}`);
        chartData.datasets[0].data.push(result.data.sumTotal || 0);

      // console.log(year);
      // console.log(response.data.sumTotal);
      // console.log(result.data.sumTotal);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Doanh Thu Theo Năm</h2>
      <Bar data={data} />
    </div>
  );
};
const YearlyOrderChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 4 },
        (_, index) => currentYear - index
      );
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Orders",
            data: [],
            backgroundColor: "rgba(0, 255, 77, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const year of years) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/order-year?year=${year}`
        );
        const result = await response;
        chartData.labels.push(`Năm ${year}`);
        chartData.datasets[0].data.push(result.data.countOrderYear || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Số Lượng Đơn Hàng Theo Năm</h2>
      <Bar data={data} />
    </div>
  );
};

//order Ngày
const DailyRevenueChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh Thu",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const currentDay = 31 // Lấy ngày hiện tại
      const days = Array.from({ length: currentDay  }, (_, index) => (currentDay - index)
);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Doanh thu",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const day of days) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/order-day?day=${day}`
        );
        const result = await response;
        chartData.labels.push(`Ngày ${day}`);
        chartData.datasets[0].data.push(result.data.sumTotal || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Doanh Thu Theo Ngày</h2>
      <Bar data={data} />
    </div>
  );
};
const DailyOrderChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const currentDay = today.getDate(); // Lấy ngày hiện tại
      const days = Array.from({ length: 7 }, (_, index) => currentDay - index);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "Order",
            data: [],
            backgroundColor: "rgba(0, 255, 77, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const day of days) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/order-day?day=${day}`
        );
        const result = await response;
        chartData.labels.push(`Ngày ${day}`);
        chartData.datasets[0].data.push(result.data.countOrderToday || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Biểu Đồ Số Lượng Đơn Hàng Theo Ngày</h2>
      <Bar data={data} />
    </div>
  );
};


// Người dùng mới ngày tháng năm
const DailyUserChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const currentDay = today.getDate(); // Lấy ngày hiện tại
      const days = Array.from({ length: 7 }, (_, index) =>  currentDay - index);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "User",
            data: [],
            backgroundColor: "rgba(0, 255, 255, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const day of days) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/user-day?day=${day}`
        );
        const result = await response;
        chartData.labels.push(`Ngày ${day}`);
        chartData.datasets[0].data.push(result.data.countNewUsersDay || 0);

        // console.log(result.data)
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Người Dùng Mới Theo Ngày</h2>
      <Bar data={data} />
    </div>
  );
};
const YearlyUserChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "User",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: 4 },
        (_, index) => currentYear - index
      );
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "User",
            data: [],
            backgroundColor: "rgba(0, 255, 255, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const year of years) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/user-year?year=${year}`
        );
        const result = await response;
        chartData.labels.push(`Năm ${year}`);
        chartData.datasets[0].data.push(result.data.countNewUsersDay || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Người Dùng Mới Theo Năm</h2>
      <Bar data={data} />
    </div>
  );
};

const MonthlyUserChart = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("user/admin"));

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "User",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const chartData = {
        labels: [],
        datasets: [
          {
            label: "User",
            data: [],
            backgroundColor: "rgba(0, 255, 255, 0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      for (const month of months) {
        const response = await createApiPjc().get(
          `http://localhost:8000/admin/user-month?month=${month}`
        );
        const result = await response;
        chartData.labels.push(`Tháng ${month}`);
        chartData.datasets[0].data.push(result.data.countNewUsersDay || 0);
      }

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ width: "450px" }}>Ngừoi Dùng Mới Theo Tháng</h2>
      <Bar data={data} />
    </div>
  );
};
export default Dashboard;
