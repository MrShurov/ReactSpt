import {Instance, types} from 'mobx-state-tree';

const User = types.model({
    bankRequisites: types.string,
    companyName: types.string,
    password: types.string,
    paymentAccount: types.string,
    postCode: types.string,
    roles: types.string,
    tel: types.string,
    unp: types.string,
    userid: types.number,
    username: types.string
});

export const SptUserStore = types
    .model('SptUserStore', {
        users: types.optional(types.array(User),[]),
    })
    .actions(self => ({
        add(userid: number,
            username: string,
            password: string,
            companyName: string,
            postCode: string,
            paymentAccount: string,
            bankRequisites: string,
            unp: string,
            tel: string,
            roles: string) {
            const foundItem = self.users.find(i => i.username === username);
            if (!foundItem) {
                self.users.push({bankRequisites,
                    companyName,
                    password,
                    paymentAccount,
                    postCode,
                    roles,
                    tel,
                    unp,
                    userid,
                    username});
            }
        }
    }));

export type ISptUserStore = Instance<typeof SptUserStore>;