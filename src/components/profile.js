import Vue from 'vue';

export default Vue.component('Profile', {
    data: () => ({
        name: 'Mochi'
    }),
    template: `
        <div class="profile">
            <img src="./images/mochi.jpg" alt="toy poodle puppy">
            <h1>Hello {{ name }}</h1>
        </div>
    `
});