<?php
declare(strict_types=1);

$act = $_REQUEST['act'] ?? die('error');
$params = isset($_REQUEST['json']) ? json_decode($_REQUEST['json'], true, 512, JSON_THROW_ON_ERROR) : [];
$jsonBox = [];
$error = [];
$info = [];
$form = [];
$host = $_SERVER['HTTP_HOST'];
$ref = $_SERVER['HTTP_REFERER'] ?? '';

$form['form-2'] = [
    'fields' => [
        'name' => [
            'title' => 'Имя',
            'validate' => [
                'preg' => '/^[A-Za-zА-Яа-я\s]+$/u',
                'minlength' => 3,
                'maxlength' => 35,
            ],
            'messages' => [
                'preg' => 'Поле [ %1$s ] возможно содержит ошибку',
                'minlength' => 'Минимальная длина поля [ %1$s ] меньше допустимой - %2$s',
                'maxlength' => 'Максимальная длина поля [ %1$s ] превышает допустимую - %2$s',
            ]
        ],
        'tell' => [
            'title' => 'Телефон',
            'validate' => [
                'preg' => "/^((8|\\+)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{5,10}$/",
                'minlength' => 10,
            ],
            'messages' => [
                'preg' => 'Поле [ %1$s ] возможно содержит ошибку',
                'minlength' => 'Минимальная длина поля [ %1$s ] меньше допустимой - %2$s',
            ]
        ]
    ]
];

// дальнейшая обработка данных
?>
<?php
declare(strict_types=1);

$act = $_REQUEST['act'] ?? die('error');
$params = isset($_REQUEST['json']) ? json_decode($_REQUEST['json'], true, 512, JSON_THROW_ON_ERROR) : [];
$jsonBox = [];
$error = [];
$info = [];
$form = [];
$host = $_SERVER['HTTP_HOST'];
$ref = $_SERVER['HTTP_REFERER'] ?? '';

$form['form-2'] = [
    'fields' => [
        'name' => [
            'title' => 'Имя',
            'validate' => [
                'preg' => '/^[A-Za-zА-Яа-я\s]+$/u',
                'minlength' => 3,
                'maxlength' => 35,
            ],
            'messages' => [
                'preg' => 'Поле [ %1$s ] возможно содержит ошибку',
                'minlength' => 'Минимальная длина поля [ %1$s ] меньше допустимой - %2$s',
                'maxlength' => 'Максимальная длина поля [ %1$s ] превышает допустимую - %2$s',
            ]
        ],
        'tell' => [
            'title' => 'Телефон',
            'validate' => [
                'preg' => "/^((8|\\+)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{5,10}$/",
                'minlength' => 10,
            ],
            'messages' => [
                'preg' => 'Поле [ %1$s ] возможно содержит ошибку',
                'minlength' => 'Минимальная длина поля [ %1$s ] меньше допустимой - %2$s',
            ]
        ]
    ]
];

// дальнейшая обработка данных
?>
