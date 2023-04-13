import React, { useState } from "react";
import { FlexAttribute } from "../../../style/Mixin";
import styled, { css } from "styled-components";
import Meatballs from "../../../asset/Meatballs";
import Option from "../../../components/Option";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { __putUserGrade } from "../../../redux/modules/profileSlice";

const UserList = ({ item }) => {
  const dispatch = useDispatch();
  const [userOption, setUserOption] = useState(false);
  const { memberRole } = JSON.parse(Cookies.get("UserInfo"));

  const optionAdminSetting = [
    {
      option: "MANAGER로 변경",
      color: "MANAGER",
      handler: () => {
        dispatch(
          __putUserGrade({
            nickname: item.nickname,
            memberRoleEnum: "MANAGER",
          })
        );
        setUserOption(false);
      },
    },
    {
      option: "MEMBER로 변경",
      color: "MEMBER",
      handler: () => {
        dispatch(
          __putUserGrade({ nickname: item.nickname, memberRoleEnum: "MEMBER" })
        );
        setUserOption(false);
      },
    },
    {
      option: "BADMEMBER로 변경",
      color: "report",
      handler: () => {
        dispatch(
          __putUserGrade({
            nickname: item.nickname,
            memberRoleEnum: "BAD_MEMBER",
          })
        );
        setUserOption(false);
      },
    },
  ];

  const optionManagerSetting = [
    {
      option: "MEMBER로 변경",
      color: "MEMBER",
      handler: () => {
        dispatch(
          __putUserGrade({ nickname: item.nickname, memberRoleEnum: "MEMBER" })
        );
        setUserOption(false);
      },
    },
    {
      option: "BADMEMBER로 변경",
      color: "report",
      handler: () => {
        dispatch(
          __putUserGrade({
            nickname: item.nickname,
            memberRoleEnum: "BAD_MEMBER",
          })
        );
        setUserOption(false);
      },
    },
  ];

  return (
    <>
      <ListContainer>
        <Image src={item.profileImage} />
        <div>
          <ListTitleWrapper>
            <UserName>{item.nickname}</UserName>
            <UserRole memberRole={item.memberRole}>
              {item.memberRole.replace("_", "")}
            </UserRole>
          </ListTitleWrapper>
          <AdditionWrapper>
            <UserEmail>{item.email}</UserEmail>
          </AdditionWrapper>
        </div>
        {item.memberRole !== "ADMIN" && (
          <UserListMeatballs onClick={() => setUserOption(!userOption)} />
        )}
      </ListContainer>
      {userOption && memberRole === "ADMIN" && (
        <Option
          setting={optionAdminSetting.filter((setting) => {
            return (
              setting.option.match(/[A-Z]/g).join("") !==
              item.memberRole.replace("_", "")
            );
          })}
          mapCloseHandler={() => setUserOption(!userOption)}
        />
      )}
      {userOption && memberRole === "MANAGER" && (
        <Option
          setting={optionManagerSetting.filter((setting) => {
            return (
              setting.option.match(/[A-Z]/g).join("") !==
              item.memberRole.replace("_", "")
            );
          })}
          mapCloseHandler={() => setUserOption(!userOption)}
        />
      )}
    </>
  );
};

const ListContainer = styled.div`
  position: relative;
  ${FlexAttribute("row", "", "center")}
  width: 335px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.input_border};
  cursor: pointer;
  :hover {
    transform: translate(0px, -1px);
    box-shadow: 0px 1px ${(props) => props.theme.color.primary_strong};
    transition: 0.3s;
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const ListTitleWrapper = styled.div`
  ${FlexAttribute("row", "", "center")}
  margin-left: 16px;
`;

const UserName = styled.span`
  margin-left: 5px;
  ${(props) => props.theme.Body_500_14};
  white-space: nowrap;
`;

const UserRole = styled.span`
  ${(props) => props.theme.Body_400_10};
  white-space: nowrap;
  margin-left: 10px;
  ${(props) =>
    props.memberRole === "ADMIN" &&
    css`
      color: ${(props) => props.theme.color.text_normal};
    `}
  ${(props) =>
    props.memberRole === "MANAGER" &&
    css`
      color: ${(props) => props.theme.color.status_positive};
    `}
    ${(props) =>
    props.memberRole === "MEMBER" &&
    css`
      color: ${(props) => props.theme.color.primary_normal};
    `}
    ${(props) =>
    props.memberRole === "BAD_MEMBER" &&
    css`
      color: ${(props) => props.theme.color.status_caution};
    `}
`;

const AdditionWrapper = styled.div`
  margin-top: 2px;
  margin-left: 16px;
`;

const UserEmail = styled.span`
  margin-top: 2px;
  margin-left: 8px;
  ${(props) => props.theme.Body_400_10};
  color: ${(props) => props.theme.color.text_assistive};
`;

const UserListMeatballs = styled(Meatballs)`
  position: absolute;
  left: calc(100% - 26px);
  cursor: pointer;
`;

export default UserList;
