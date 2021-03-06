import { Button, Checkbox, Col, Drawer, Form, Input, Row, Switch } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormProvider } from "rc-field-form";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { update, updateByID, createStudentAndRegisterNewAccount } from "../../api/students"
import { CalendarOutlined, PhoneOutlined } from "@ant-design/icons"
const types = {
  NEW: "new",
  EDIT: "edit",
};

const fieldNames = {
  firstName: "firstName",
  surName: "surName",
  birthday: "birthday",
  national: "national",
  gender: "gender",
  ethnic: "ethnic", //King
  religion: "religion", //Dao phat
  bornAddress: "bornAddress",
  citizenCardId: "citizenCardId", //chung minh thu
  homeAddress: "homeAddress",
  currentAddress: "currentAddress",
  phoneNumber: "phoneNumber",
  email: "email",
  fatherPhoneNumber: "fatherPhoneNumber",
  motherPhoneNumber: "motherPhoneNumber",
  school: "school", // UET
  academyMethod: "academyMethod", //chinh quy...a
  levelOfAcademy: "levelOfAcademy", //University, Doctorate
  schoolYearGroup: "schoolYearGroup", //K64,.. ??
  baseClass: "baseClass", //CA-CLC4
  major: "major", //Khoa hoc may tinh
  startedYear: "startedYear",
  managedBy: "managedBy",
  note: "note",
  id: "id"
};

const StudentConfig = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [currentType, setCurrentType] = useState();
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    openNew() {
      setVisible(true);
      setCurrentType(types.NEW);
    },
    openEdit(data) {
      setVisible(true);

      setCurrentType(types.EDIT);

      form.setFields(
        Object.values(fieldNames).map((name) => ({
          name: name,
          value: data[name],
        }))
      );
    },
  }));
  useEffect(() => {

  })
  const onFinish = (values) => {

    if (currentType === types.NEW) {
      delete values.id;
      createStudentAndRegisterNewAccount(values)
        .then(res => {
          if (res.status ===200)
            window.location.reload(false);
          else alert("Kh??ng th??? t???o t??i kho???n. L???i server")

        })
    } else {
      updateByID(values.id, values).then(res => {
        if (res.status === 200)
          window.location.reload(false);
        else alert("Kh??ng th??? c???p nh???p t??i kho???n. L???i server")
      });
    }
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Drawer
      visible={visible}
      onClose={onCancel}
      width={800}
      title={
        currentType === types.NEW ? "T???o m???i sinh vi??n" : "Ch???nh s???a sinh vi??n"
      }
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onCancel}>Hu??? b???</Button>
          </Col>

          <Col>
            <Button type="primary" onClick={() => form.submit()}>
              {currentType === types.NEW ? "T???o m???i" : "C???p nh???t"}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        Th??ng tin c?? b???n
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="H???" name={fieldNames.surName} rules={[{ required: true, message: "H??y nh???p h??? c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="T??n" name={fieldNames.firstName} rules={[{ required: true, message: "H??y nh???p t??n c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Ng??y sinh" name={fieldNames.birthday} rules={[{ required: true, message: "H??y nh???p ng??y sinh c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Gi???i t??nh" name={fieldNames.gender} rules={[{ required: true, message: "H??y nh???p gi???i t??nh c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item  label="S??? ??i???n tho???i" name={fieldNames.phoneNumber} rules={[{ required: true, message: "H??y nh???p s??? ??i???n tho???i c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Email" name={fieldNames.email} rules={[{ required: true, message: "H??y nh???p email c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>

          <Col span={12}>
            <Form.Item label="S??? ??i???n tho???i b???" name={fieldNames.fatherPhoneNumber} >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="S??? ??i???n tho???i m???" name={fieldNames.motherPhoneNumber}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="N??i sinh" name={fieldNames.bornAddress} rules={[{ required: true, message: "H??y nh???p n??i sinh c???a sinh vi??n" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="?????a ch??? th?????ng tr??" name={fieldNames.homeAddress} rules={[{ required: true, message: "H??y nh???p ?????a ch??? th?????ng tr?? c???a sinh vi??n" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="?????a ch??? hi???n t???i" name={fieldNames.currentAddress} rules={[{ required: true, message: "H??y nh???p ?????a ch??? hi???n t???i c???a sinh vi??n" }]}>
          <Input />
        </Form.Item>

        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Qu???c t???ch" name={fieldNames.national} rules={[{ required: true, message: "H??y nh???p Qu???c t???ch c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="D??n t???c" name={fieldNames.ethnic} rules={[{ required: true, message: "H??y nh???p D??n t???c c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="T??n gi??o" name={fieldNames.religion} rules={[{ required: true, message: "H??y nh???p T??n gi??o c???a sinh vi??n. ????? l?? 'Kh??ng C??' n???u kh??ng c??" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="C??n c?????c c??ng d??n" name={fieldNames.citizenCardId} rules={[{ required: true, message: "H??y nh???p c??n c?????c c??ng d??n c???a sinh vi??n" }]}>
          <Input />
        </Form.Item>
        
        Th??ng tin tr?????ng
        <Row gutter={10}>
          <Col span={10}>
            <Form.Item label="T??n tr?????ng" name={fieldNames.school} rules={[{ required: true, message: "H??y nh???p t??n tr?????ng h???c c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="Ng??nh h???c" name={fieldNames.major} rules={[{ required: true, message: "H??y nh???p t??n ng??nh h???c c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={10}>
            <Form.Item label="H??nh th???c h???c t???p" name={fieldNames.academyMethod} rules={[{ required: true, message: "H??y nh???p H??nh th???c h???c t???p c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="Tr??nh ????? h???c v???n" name={fieldNames.levelOfAcademy} rules={[{ required: true, message: "H??y nh???p Tr??nh ????? h???c v???n c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Kh??a" name={fieldNames.schoolYearGroup} rules={[{ required: true, message: "H??y nh???p kh??a c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="L???p" name={fieldNames.baseClass} rules={[{ required: true, message: "H??y nh???p L???p c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="N??m b???t ?????u h???c" name={fieldNames.startedYear} rules={[{ required: true, message: "H??y nh???p N??m b???t ?????u h???c c???a sinh vi??n" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>





        <Form.Item label="Qu???n l?? b???i" name={fieldNames.managedBy}>
          <Input />
        </Form.Item>
        <Form.Item label="Ghi ch?? SV" name={fieldNames.note}>
          <Input />
        </Form.Item>
        <Form.Item label="id" name={fieldNames.id} hidden={true}>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default StudentConfig;
