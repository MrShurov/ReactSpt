import {Instance, types} from 'mobx-state-tree';

export const User = types.model({
    bankRequisites: types.string,
    companyName: types.string,
    password: types.string,
    paymentAccount: types.string,
    postCode: types.string,
    roles: types.string,
    tel: types.string,
    unp: types.string,
    userid: types.number,
    username: types.string,
    uuid: types.string
});

export type User = Instance<typeof User>;

export const SptUserStore = types
    .model('SptUserStore', {
        users: types.optional(types.array(User),[]),
    })
    .actions(self => ({
        add(user : User) {
            const foundItem = self.users.find(i => i.username === user.username);
            if (!foundItem) {
                self.users.push(user);
            }
        }
    }));

export type ISptUserStore = Instance<typeof SptUserStore>;