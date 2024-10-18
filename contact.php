<?php
declare(strict_types=1);

$post = !empty($_POST);

if ($post) {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $colServer = $_POST['col-server'] ?? '';
    $colStation = $_POST['col-station'] ?? '';
    $messagess = $_POST['messagess'] ?? '';
    $error = '';

    if (!$name) {
        $error .= 'Имя не указано.';
    }

    if (!$phone || strlen($phone) < 1) {
        $error .= "Телефон не указан или слишком короткий.";
    }

    if (!$error) {
        $subject = "Новый заказ с сайта ДедМорозка";
        $mail = mail("alex_suschin@mail.ru", $subject, "Имя: $name, Телефон: $phone, Сервер: $colServer, Станция: $colStation");

        if ($mail) {
            echo 'OK';
        } else {
            echo 'Ошибка отправки email.';
        }
    } else {
        echo $error;
    }
}
?>
