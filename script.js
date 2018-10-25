$(document).ready(function(){
    function validation(self){
        value = $(self).val();
        tagname = $(self).closest('.parent_div').next().prop('tagName');
            if(tagname == 'SPAN')
                $(self).closest('.parent_div').next().remove();
        $(self).removeClass('error');
        type = $(self).attr('type');
        if(value.length == 0){
            if(type != 'number')
                $(self).parent().after('<span>Please complete self required field</span>');
            else
                $(self).parent().after('<span>Please enter a valid number.</span>');
            $(self).addClass('error');
        }
            
        else {  
            if(type == 'email')
            {
                if(!isEmail(value)){
                    $(self).closest('.parent_div').after('<span>Email must be formatted correctly.</span>');
                    $(self).addClass('error');
                }
            }
            else if(type == 'checkbox' || type == 'radio'){
                var checked = 0;
                var name = $(self).attr('name');
                $('input[name="'+name+'"]').each(function(){
                    if($(self).prop('checked') == true)
                        checked = 1;
                });
                if(checked == 0){
                    $(self).closest('.parent_div').after('<span>Please select at least one option.</span>');
                    $(self).addClass('error');
                }
            }
            else if(type == "number"){
                if(value < 4){
                    $(self).closest('.parent_div').after("<span>Please enter a number that's greater than or equal to 4.</span>");
                    $(self).addClass('error');
                }
            }
        }
    }
    $('input[required]').change(function(){
        validation(this);
    });
    $('#submit').click(function(e){
        e.preventDefault();
        $('input[required]').each(function(){
            $(this).removeAttr('required');
            validation(this);
            $(this).attr('required');
        });
    });
});
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

