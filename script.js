var $ = jQuery, counter = 0;
$(document).ready(function () {
    cloneRow();
    $('#addRowItem').on('click', function () {
        cloneRow();
    });
    typeChangeSelector();

    /** type change selector dynamic function */
    function typeChangeSelector() {
        $('.selectType').on('change', function () {
            let inputDiv = $($($(this).parent()[0]).parent()[0]).find('input');
            if ($(this).val() === 'Hourly') {
                $(inputDiv[0]).attr("placeholder", "Price Hourly");
                $(inputDiv[1]).attr("placeholder", "No Of Hours");
            } else if ($(this).val() === 'Fixed') {
                $(inputDiv[0]).attr("placeholder", "Fixed Amount");
                $(inputDiv[1]).attr("placeholder", "Fixed Quantity Quantity");
            }
        })
    }

    /** clone table row */
    function cloneRow() {
        var itemCloned = $('.toCloneItem tr').clone();
        $($(itemCloned).find('.selectItem')).attr('name', 'data[' + counter + '][item]');
        $($(itemCloned).find('.selectType')).attr('name', 'data[' + counter + '][type]');
        $($(itemCloned).find('.qnty1')).attr('name', 'data[' + counter + '][qnty1]');
        $($(itemCloned).find('.qnty2')).attr('name', 'data[' + counter + '][qnty2]');
        $($(itemCloned).find('.totalPrice')).attr('name', 'data[' + counter + '][totalPrice]');
        counter++;
        $('#tableBody').append(itemCloned);
        removeItem();
        typeChangeSelector();
        calculateTotals();
        subCalculateTotals();
    }

    /** calculate subtotal*/
    calculateTotals();

    function calculateTotals() {
        $('.value').on('keyup', function () {
            let totalInputs = $($($(this).parent()[0]).parent()[0]).find('input');
            let quantity1 = totalInputs[0].value;
            let quantity2 = totalInputs[1].value;
            let totalPrice = totalPriceOfValues(quantity1, quantity2);
            totalInputs[2].value = totalPrice;
            totalPriceCalculation();
        })
    }

    subCalculateTotals();

    /** functoin of subtal tax and discount */
    function subCalculateTotals() {
        $('.final').on('keyup', function () {
            let subElements = $($($(this).parent()[0]).parent()[0]).find('input');
            let tax = subElements[1].value;
            let discount = subElements[2].value;
            let subTotalAll = subElements[0].value;
            let getAfterTaxPrice = taxCalculation(subTotalAll, tax);
            let getFinalPrice = getAfterTaxPrice - discount;
            $('.finalPrice').val(getFinalPrice);
        })
    }

});

/** calculate subtotal */
function totalPriceCalculation() {
    let subTotalElements = $('.totalPrice');
    let total = 0;
    subTotalElements.splice(-1, 1);
    for (let item of subTotalElements) {
        total = total + parseFloat($(item).val());
    }
    $('.subTotal').val(total);

}

/** remove table row button */
function removeItem() {
    $('.deleteBtn').on('click', function () {
        $(this).closest('tr').remove();
        counter--;
    })
}

/**price of two fixed or hourly quantities*/
function totalPriceOfValues(val1, val2) {
    return val1 * val2;
}

/** tax calculation*/
function taxCalculation(total, taxPrice) {
    let tax = total / 100 * taxPrice;
    return total - tax;
}




