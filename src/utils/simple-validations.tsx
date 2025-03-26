import moment from "moment";
import React from "react";

export const ErrorLabel = ({ props, field }: { props: any; field: string }) => {
  if (props.errors[field] && props.touched[field]) {
    return <div className="error_label">{props.errors[field]}</div>;
  }

  return null;
};

export const isDefined = (value: React.ReactNode) =>
  value !== null && value !== undefined && value !== "";

export const validate = (rules: any[]) => (value: any) => {
  return rules.map((rule) => rule(value)).filter((i) => i)[0] || "";
};

export const _isRequired = (error?: string) => (value: any) => {
  if (!isDefined(value) || value === "") {
    return error || "Заповніть поле";
  }

  return "";
};

export const _moreLength = (limit: number, error?: string) => (value: any) => {
  if (limit >= +value.length) {
    return error || `Значення повинно бути більше ${limit}`;
  }

  return "";
};

export const _atLeastOneOption = (error?: string) => (value: any) => {
  if (!!value && value.length) {
    return "";
  }

  return error || `Выберите хотя бы одну опцию`;
};

export const _dateIsLaterThan =
  (date: Date | string, error?: string) => (value: any) => {
    const isLater = moment(value).valueOf() > moment(date).valueOf();

    if (!value || !date) {
      console.warn("Has no one from dates:", date, value);
      return "";
    }

    if (isLater) {
      return "";
    }

    return error || `Дата повинна бути в майбутньому`;
  };

export const _dateIsLaterOrEqualThan =
  (date: Date | string, error?: string) => (value: any) => {
    const isLaterOrEqual =
      moment(value).valueOf() >=
      moment(moment(date).format("YYYY-MM-DD")).valueOf();

    if (!value || !date) {
      console.warn("Has no one from dates:", date, value);
      return "";
    }

    if (isLaterOrEqual) {
      return "";
    }

    return error || `Дата должна быть в будущем`;
  };

export const _dateIsEarlierThan =
  (date: Date | string, error?: string) => (value: any) => {
    const isLater = moment(value).valueOf() < moment(date).valueOf();

    if (!value || !date) {
      console.warn("Has no one from dates:", date, value);
      return "";
    }

    if (isLater) {
      return "";
    }

    return error || `Дата должна быть в прошлом`;
  };

export const _oneOfLength =
  (lengths: number[], error?: string) => (value: any) => {
    const isOneOfLength = !!value
      ? lengths?.some((length) => String(value).length === length)
      : true;

    if (isOneOfLength) {
      return "";
    }

    return (
      error || `Длина значения может быть ${lengths.join(" или ")} символов`
    );
  };

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const _isPhoneNumber = (error?: string) => (value: any) => {
  const phoneResult = phoneRegExp.test(value);
  if (phoneResult || !value) {
    return "";
  }

  return error || `Некоректний номер телефону`;
};

export const _isEmail = (error?: string) => (value: any) => {
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (emailRegExp.test(value) || !value) {
    return "";
  }

  return error || "Некоректний e-mail";
};

const webSiteRegExp =
  /^((https?|s?ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

export const _isWebSite = (error?: string) => (value: any) => {
  const webSiteResult = webSiteRegExp.test(value);

  if (webSiteResult) {
    return "";
  }

  return error || "Website url not correct";
};

export const _fileType = (type: string[], error?: string) => (value: File) => {
  if (value?.type && !type.includes(value.type)) {
    return error || "Некоректний формат файлу";
  }

  return "";
};

export const mask_onlyDigits = (value: string) => {
  return value.replace(/[^\d]/g, "");
};
