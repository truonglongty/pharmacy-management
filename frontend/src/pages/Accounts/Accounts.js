import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import {
  Container,
  Content,
  Toolbar,
  Table,
  TableHeader,
  TableCell,
  Button,
  SearchInput,
  roleMap,
  Form,
  Input,
  Select,
} from './AccountsStyles';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: '',
    employee: '',
  });
  const [editingAccountID, setEditingAccountID] = useState(null);

  const fetchAccounts = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };

    try {
      const response = await axios.get('http://localhost:8000/api/auth/accounts/', { headers });
      setAccounts(response.data);
      setFilteredAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);

    const filtered = accounts.filter((account) => {
      const roleName = typeof account.role === 'string' ? account.role : account.role?.roleName || '';
      return (
        account.username.toLowerCase().includes(keyword) ||
        roleName.toLowerCase().includes(keyword)
      );
    });

    setFilteredAccounts(filtered);
  };

  const handleAddOrUpdateAccount = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };

    try {
      if (editingAccountID) {
        // Update account
        await axios.put(`http://localhost:8000/api/auth/accounts/${editingAccountID}/`, form, { headers });
      } else {
        // Add new account
        await axios.post('http://localhost:8000/api/auth/accounts/', form, { headers });
      }
      setForm({ username: '', password: '', role: '', employee: '' });
      setShowForm(false);
      setEditingAccountID(null);
      fetchAccounts();
    } catch (error) {
      console.error('Error saving account:', error.response?.data || error.message);
    }
  };

  const handleEditAccount = (account) => {
    setForm({
      username: account.username,
      password: '', // Do not prefill password
      role: account.role,
      employee: account.employee,
    });
    setShowForm(true);
    setEditingAccountID(account.accountID);
  };

  const handleDeleteAccount = async (accountID) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };

    try {
      await axios.delete(`http://localhost:8000/api/auth/accounts/${accountID}/`, { headers });
      fetchAccounts();
    } catch (error) {
      console.error('Error deleting account:', error.response?.data || error.message);
    }
  };

  const handleToggleAccountStatus = async (accountID, currentStatus) => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Token ${token}` };

    try {
      await axios.patch(`http://localhost:8000/api/auth/accounts/${accountID}/`, { is_active: !currentStatus }, { headers });
      fetchAccounts();
    } catch (error) {
      console.error('Error toggling account status:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Toolbar>
          <div>
            <Button onClick={() => { setShowForm(!showForm); setEditingAccountID(null); }}>THÊM</Button>
          </div>
          <div>
            <SearchInput
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              value={searchKeyword}
              onChange={handleSearch}
            />
          </div>
        </Toolbar>

        {showForm && (
          <Form onSubmit={handleAddOrUpdateAccount}>
            <Input
              type="text"
              placeholder="Tên tài khoản"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editingAccountID} // Password is required only for new accounts
            />
            <Select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="">Chọn quyền</option>
              <option value="1">Nhân viên bán hàng</option>
              <option value="2">Nhân viên quản lý sản phẩm</option>
            </Select>
            <Input
              type="text"
              placeholder="Nhân viên (ID)"
              value={form.employee}
              onChange={(e) => setForm({ ...form, employee: e.target.value })}
            />
            <Button type="submit">{editingAccountID ? 'Cập nhật tài khoản' : 'Tạo tài khoản'}</Button>
          </Form>
        )}

        <h2>DANH SÁCH TÀI KHOẢN</h2>
        <Table>
          <thead>
            <tr>
              <TableHeader>STT</TableHeader>
              <TableHeader>Tên tài khoản</TableHeader>
              <TableHeader>Nhân viên</TableHeader>
              <TableHeader>Quyền</TableHeader>
              <TableHeader>Trạng thái</TableHeader>
              <TableHeader>Hành động</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={account.accountID}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.employee || 'N/A'}</TableCell>
                <TableCell>{roleMap[account.role]}</TableCell>
                <TableCell>{account.is_active ? 'Hoạt động' : 'Vô hiệu'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditAccount(account)}>Sửa</Button>
                  <Button onClick={() => handleDeleteAccount(account.accountID)}>Xóa</Button>
                  <Button onClick={() => handleToggleAccountStatus(account.accountID, account.is_active)}>
                    {account.is_active ? 'Vô hiệu hóa' : 'Kích hoạt'}
                  </Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default Accounts;