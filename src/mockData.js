import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  isOnline: faker.datatype.boolean(),
  lastSeen: faker.date.recent(),
});

export const generateUsers = (count = 10) => {
  return Array.from({ length: count }, generateUser);
};

export const generateMessage = (senderId, text = null) => ({
  id: faker.string.uuid(),
  senderId,
  text: text || faker.lorem.sentence(),
  timestamp: new Date(),
});
