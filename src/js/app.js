import Ajax from './helpers/ajax';

const ajax = new Ajax();

ajax.get('./views/about.html', (data) => {
    document.getElementById('root').innerHTML = data;
});