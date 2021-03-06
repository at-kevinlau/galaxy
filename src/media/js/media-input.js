define('media-input', ['jquery', 'z'], function($, z) {
    
    function createInput($section) {
        $section.append($('<input>', { 
            type: 'url', 
            placeholder: $section.data('placeholder'),
            pattern: 'https?://.*'
        }));
    }

    z.page.on('loaded', function() {
        $('.fallback').each(function() {
            var $this = $(this);
            createInput($this);            
        });
    }).on('input', '.media input', function(e) {
        var $input = $(e.target);
        var $allInputs = $input.parent().children('input[type=url]');
        var $emptyInputs = $allInputs.filter(function() {
            return !$(this).val();
        });

        if ($input.val() && $emptyInputs.length === 0) {
            createInput($input.parent());
        } else {
            // So that at any point in time, there will be exactly 
            // ONE empty input field for user to enter more URLs.
            $emptyInputs.slice(1).remove();
        }
    });
});
