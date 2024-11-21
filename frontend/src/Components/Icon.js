import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faHome, faUserGraduate , faChartSimple,faClipboardUser, faBook } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const iconMap = {
  teacher: faChalkboardUser,
  home: faHome,
  student: faUserGraduate ,
  performance: faChartSimple ,
  attendance: faClipboardUser ,
  subject: faBook,
};

const Icon = ({ name, ...props }) => {
  const icon = iconMap[name];
  if (!icon) return null;
  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default Icon;
