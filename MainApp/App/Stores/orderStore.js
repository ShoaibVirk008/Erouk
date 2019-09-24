import { observable } from 'mobx'

class orderStore {
    @observable LOADING = false;
    @observable FCM_TOKEN = '';
    @observable LOGIN_RESPONSE = {};
    @observable PRODUCT_DETAIL = [];
    @observable SHOPS_LIST = [];
    @observable CATEGORY_LIST = [];
    @observable PRODUCTS = [];
    @observable CATEGORIES = [];
    @observable DRAWER = false;
    @observable SELECTED_SHOP = {};
    @observable SELECTED_SHOP_NAME = '';
    @observable product_id = 0;
    @observable CONTACT_LIST = [];
    @observable DELETED_HISTORY = [];
    @observable SEARCED_PRODUCTS = [];
    @observable TASK_DETAIL = {};
    @observable NOTE_DETAIL = {};
    @observable MEMBERS_LIST = [];




    @observable NOTIFICATION_TIME = [];
    @observable TIME = [{ id: 1, value: '12 am', key: 'am', check: false }, { id: 2, value: '1 am', key: 'am', check: false }, { id: 3, value: '2 am', key: 'am', check: false }, { id: 4, value: '3 am', key: 'am', check: false },
    { id: 5, value: '4 am', key: 'am', check: false }, { id: 6, value: '5 am', key: 'am', check: false }, { id: 7, value: '6 am', key: 'am', check: false }, { id: 8, value: '7 am', key: 'am', check: false },
    { id: 9, value: '8 am', key: 'am', check: false }, { id: 10, value: '9 am', key: 'am', check: false }, { id: 11, value: '10 am', key: 'am', check: false }, { id: 12, value: '11 am', key: 'am', check: false },
    { id: 13, value: '12 am', key: 'pm', check: false }, { id: 14, value: '1 pm', key: 'pm', check: false }, { id: 15, value: '2 pm', key: 'pm', check: false }, { id: 16, value: '3 pm', key: 'pm', check: false },
    { id: 17, value: '4 pm', key: 'pm', check: false }, { id: 18, value: '5 pm', key: 'pm', check: false }, { id: 19, value: '6 pm', key: 'pm', check: false }, { id: 20, value: '7 pm', key: 'pm', check: false },
    { id: 21, value: '8 pm', key: 'pm', check: false }, { id: 22, value: '9 pm', key: 'pm', check: false }, { id: 23, value: '10 pm', key: 'pm', check: false }, { id: 24, value: '11 pm', key: 'pm', check: false }];

}

const store = new orderStore();

export default store;
