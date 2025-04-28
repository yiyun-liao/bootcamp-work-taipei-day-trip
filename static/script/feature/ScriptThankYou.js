// render order number===========================================================================
export async function renderOrderNumber(orderNumber){
    const orderIsSuccess = document.querySelector('.order_success');
    const orderId = document.querySelector('.order-id');
    orderIsSuccess.style.display = 'flex';
    orderId.textContent = `${orderNumber}`;

    document.getElementById('skeleton').remove('skeleton')
}