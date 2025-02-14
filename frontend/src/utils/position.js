export const positions = {
  admin: "Админ / директор",
  accountant: "Бухгалтер",
  marketing: "Менеджер продаж",
  teacher: "Учитель",
};
export const statuses = {
  payed: "Оплачено",
  canceled: "Не заплатил",
};
export const classes = {
  admin: "is-success",
  accountant: "is-danger",
  marketing: "is-primary",
  teacher: "is-warning",
};

export const tests = {
  good: "Bajarilgan",
  satisfactory: "Qoniqarli",
  not_done: "Bajarilmagan",
};
export const comments = {
  not_ready_for_class: "Darsga tayyor emas",
  homework_not_done: "Uyga vazifani bajarmagan",
  unprepared: "O'qimasdan kelgan",
  payment_reminder: "To`lovni yetkazishingizni so`raymiz",
};

export const payment = [
  { name: "Bajarilgan", value: "good" },
  { name: "Qoniqarli", value: "satisfactory" },
  { name: "Bajarilmagan", value: "not_done" },
];
export const comment = [
  { name: "Darsga tayyor emas", value: "not_ready_for_class" },
  { name: "Uyga vazifani bajarmagan", value: "homework_not_done" },
  { name: "O'qimasdan kelgan", value: "unprepared" },
  { name: "To`lovni yetkazishingizni so`raymiz", value: "payment_reminder" },
];

export const studentAbsent = [
  { name: "Sababli", value: "come_from" },
  { name: "Sababsiz", value: "not_come_from" },
];

export const lessonType = [
  { name: "Группа", value: "group" },
  { name: "Мини группа", value: "mini_group" },
  { name: "Индивидуальный", value: "individual" },
];

export const marks = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

export const phoneOwnerOptions = [
  { label: "Личный", value: "himself" },
  { label: "Номер матери", value: "mather" },
  { label: "Номер отца", value: "father" },
];

export function getPhoneOwnerLabel(value) {
  return phoneOwnerOptions.find((item) => item.value === value)?.label;
}

export const monthOptions = [
  { name: "Январь", value: "january" },
  { name: "Февраль", value: "february" },
  { name: "Март", value: "march" },
  { name: "Апрель", value: "april" },
  { name: "Май", value: "may" },
  { name: "Июнь", value: "june" },
  { name: "Июль", value: "july" },
  { name: "Август", value: "august" },
  { name: "Сентябрь", value: "september" },
  { name: "Октябрь", value: "october" },
  { name: "Ноябрь", value: "november" },
  { name: "Декабрь", value: "december" },
];

export function getMonthOptions(value) {
  return monthOptions.find((item) => item.value === value)?.name;
}

export function getLessonType(value) {
  return lessonType.find((item) => item.value === value)?.name;
}

export function getHomework(value) {
  return payment.find((item) => item.value === value)?.name;
}

export function getComment(value) {
  return comment.find((item) => item.value === value)?.name;
}

export function getAbsent(value) {
  return studentAbsent.find((item) => item.value === value)?.name;
}
export const absents = {
  come_from: "Sababli",
  not_come_from: "Sababsiz",
};
export function test(name) {
  return [name];
}

export function mark(name) {
  return marks[name];
}
export function position(name) {
  return positions[name];
}

export function absent(name) {
  return absents[name];
}
export function status(name) {
  return statuses[name];
}

export function positionClass(name) {
  return classes[name];
}

export const studyDays = [
  { label: "Du/Ch/Ju", value: "monday_wednesday_friday" },
  { label: "Se/Pa/Sha", value: "tuesday_thursday_saturday" },
  { label: "Yakshanba", value: "sunday" },
];

export function getStudyDays(value) {
  return studyDays.find((item) => item.value === value)?.label;
}

export const languages = [
  { label: "O`zbekcha", value: "uzbek" },
  { label: "Ruscha", value: "russian" },
];

export function getLanguages(value) {
  return languages.find((item) => item.value === value)?.label;
}

export const studyTimes = [
  { label: "Ertalab", value: "morning" },
  { label: "Abeddan keyin", value: "after_lunch" },
  { label: "Kechqurun", value: "night" },
];

export function getStudyTime(value) {
  return studyTimes.find((item) => item.value === value)?.label;
}

export const connectionStatus = [
  { label: "Подключено", value: "added" },
  { label: "Не подключено", value: "not_added" },
];

export function getConnectionStatus(value) {
  return connectionStatus.find((item) => item.value === value)?.label;
}
