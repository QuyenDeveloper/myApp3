-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 01:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dn2ndhome`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_new`
--

CREATE TABLE `cart_new` (
  `cart_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `id_prd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart_new`
--

INSERT INTO `cart_new` (`cart_id`, `user_id`, `id_prd`) VALUES
(14, 2, 12),
(15, 2, 14),
(17, 9, 12),
(18, 9, 19),
(19, 9, 20),
(45, 2, 22),
(53, 7, 27),
(54, 7, 60);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `ct_subject` varchar(255) NOT NULL,
  `ct_message` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `ct_subject`, `ct_message`, `user_id`, `created_at`) VALUES
(1, 'Góp ý', 'Tôi nghĩ website nên mở rộng phạm vi dịch vụ', 3, '29-11-2021'),
(2, 'Kiến nghị', 'Tôi thấy website rất ok, sẽ tốt hơn nếu website bổ sung dịch vụ bán nhà', 15, '30-11-2021]');

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `district_id` int(11) NOT NULL,
  `district_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`district_id`, `district_name`) VALUES
(1, 'Hải Châu'),
(2, 'Cẩm lệ'),
(3, 'Thanh Khê'),
(4, 'Liên Chiểu'),
(5, 'Ngũ Hành Sơn'),
(6, 'Sơn Trà'),
(7, 'Hòa Vang'),
(8, 'Hoàng Sa');

-- --------------------------------------------------------

--
-- Table structure for table `prd_info`
--

CREATE TABLE `prd_info` (
  `prd_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `district_id` int(10) NOT NULL,
  `ward_id` int(10) NOT NULL,
  `detail_address` varchar(255) NOT NULL,
  `prd_title` varchar(255) NOT NULL,
  `area` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `prd_detail` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `img2` varchar(255) NOT NULL,
  `img3` varchar(255) NOT NULL,
  `img4` varchar(255) NOT NULL,
  `prd_status` int(10) NOT NULL,
  `full` int(11) NOT NULL DEFAULT 1,
  `create_day` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prd_info`
--

INSERT INTO `prd_info` (`prd_id`, `user_id`, `district_id`, `ward_id`, `detail_address`, `prd_title`, `area`, `price`, `prd_detail`, `img`, `img2`, `img3`, `img4`, `prd_status`, `full`, `create_day`) VALUES
(12, 5, 5, 36, '420 Nam kì khởi nghĩa', 'Phòng trọ gần Việt Hàn IT', 20, 1000000, 'Phòng mới xây, đẹp, có nỗi sẵn dây điều hòa\r\n+An ninh tốt\r\n+Có gác lửng', 'phongtro-1.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '28-11-2021'),
(14, 10, 2, 15, '15 đường Huỳnh Minh Khai', 'Phòng trọ số 15 Huỳnh Minh Khai phường Hòa Phát', 18, 1200000, 'Phòng đẹp giá rẻ, gần khu trung tâm', 'phong1.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '28-11-2021'),
(16, 5, 2, 15, 'số 22 Cẩm Nam 1, dưới cầu Cá', 'ho thuê căn hộ mới xây đường Cẩm Nam 1, gần Cầu Cẩm Lệ', 20, 2500000, ' Vị trí gần sông Cẩm Lệ, gần bệnh viện Phục hồi chức năng, BV Y học Cổ truyền, chợ Hòa Xuân.', 'thiet-ke-phong-tro-khep-kin-22m2.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '02-12-2021'),
(18, 18, 3, 24, '30 Hai Bà Trưng', 'Cho thuê phòng trọ giá rẻ quận Thanh Khê', 25, 1800000, 'Cho thuê phòng trọ trung tâm tp Đà Nẵng giá rẻ', '861d6d72-trang-tr-phong-tro-dep-khong-gac-3.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '04-12-2021'),
(19, 19, 2, 18, '80 Lê Đại Hành', '\r\nCho thuê Phòng trọ gần Chợ Hòa Cầm, Cẩm Lệ', 22, 1000000, 'Cho thuê Phòng trọ mới, gần chợ Hòa Cầm, gần bệnh viện Cẩm Lệ. Diện tích 24m2, có gác lửng', 'hi-xay-1-phong-tro.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '04-12-2021'),
(20, 19, 7, 47, '80 Lê Đại Hành', 'Cho thuê phòng trọ, Ngô Mây, Hòa Vang, Đà Nẵng', 18, 1900000, 'Địa chỉ : 195 Ngô Mây, Hòa Vang, Đà Nẵng\r\n Phòng mới, sạch sẽ, thoáng mát', 'images (1).jfif', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '04-12-2021'),
(21, 10, 6, 44, '80 Lê Đại Hành', 'Cho thuê trọ 18 Đào Duy Từ Phước Mỹ Sơn Trà', 32, 20000000, 'Cho thuê trọ 18 Đào Duy Từ Phước Mỹ Sơn Trà đầy đủ tiện nghia an ninh tốt', '20210930141227-rdqqs.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '04-12-2021'),
(22, 2, 4, 33, '80 Lê Đại Hành', 'Cho thuê phòng trọ gần ĐH Sư Phạm', 25, 1800000, 'Phòng trọ diện tích 20m2 – 30m2 cửa sổ thoáng mát, kệ bếp nấu ăn, quạt tường có sẵn, sân hiên rộng, sân phơi đồ, phòng vệ sinh đầy đủ tiện nghi', 'phong-tro-gia-re-tphcm_1623484658.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 2, '05-12-2021'),
(26, 2, 6, 44, '80 Lê Đại Hành', 'Cho thuê phòng trọ Phước Mỹ Sơn Trà', 15, 1200000, 'Cho thuê phòng trọ Phước Mỹ Sơn Trà, địa chỉ 16 đường Nguyễn Du gần chợ, liên hệ sdt 038238245', 'thiet-ke-phong-tro-dep-5.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '05-12-2021'),
(27, 15, 1, 10, '80 Lê Đại Hành', 'Phòng trọ quận Hải Châu Phước Ninh', 22, 2300000, 'Phòng trọ quận Hải Châu Phước Ninh, đường 138 Quang trung, liên hệ FB A Hiếu Vipro', 'vay-lai-xay-phong-tro-3.jpg', 'detail1.jpg', 'detail2.jpg', 'detail3.jpg', 2, 1, '05-12-2021'),
(59, 2, 5, 36, '18 LE thien Tri', 'Va112', 12, 1300000, 'Phong mơi xay , an ninh tot', 'photo-2-15996393046531548622009.webp', 'photo-2-15996393046531548622009.webp', 'photo-2-15996393046531548622009.webp', 'photo-2-15996393046531548622009.webp', 2, 1, '14-06-2023'),
(60, 7, 1, 2, 'Rrrr', 'Qqq', 20, 200000, 'alo', '1703692676078rn_image_picker_lib_temp_aafeb974-6bf2-497d-85f4-fb0f6eb68369.jpg', '1703692676090rn_image_picker_lib_temp_8a2233be-f55c-46b6-802c-4e9904f73722.jpg', '1703692676104rn_image_picker_lib_temp_85ab7266-c20a-450e-8bde-1915974b6961.jpg', '1703692676118rn_image_picker_lib_temp_584a42f1-9a59-4584-920d-e22976e9f9da.jpg', 2, 1, '2023-12-27 22:57:56'),
(67, 7, 5, 35, '46 le thien tri', 'New house at le thien tri', 50, 1200000, 'Ssssss', '1703764776437rn_image_picker_lib_temp_bdb35ed6-f768-4ead-aff9-a2f14ef6a991.jpg', '1703764776437rn_image_picker_lib_temp_6379aac6-4d2b-46f2-a2b7-afb869533d10.jpg', '1703764776437rn_image_picker_lib_temp_f7347b5c-a65d-4bfc-878d-a32ba4b55af6.jpg', '1703764776445rn_image_picker_lib_temp_bdace28c-3b52-41a9-b846-5fd6c0507772.jpg', 1, 1, '2023-12-28 18:59:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `avatar` varchar(250) NOT NULL,
  `user_level` int(10) NOT NULL,
  `created_at` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `pass`, `email`, `phone`, `avatar`, `user_level`, `created_at`) VALUES
(1, 'Admin1', '1', 'admin@gmail.com', '19001009', 'DefaultAvt.jpg', 1, '22-11-2021'),
(2, 'Quân', '123456', 'quanphan2k2@gmail.com', '123456789', 'tải xuống.jfif', 2, '02-12-2021'),
(3, 'Quân', '123456', 'email1@gmail.com', '', 'DefaultAvt.jpg', 2, '22-11-2021'),
(5, 'Minh', '1', 'mail2@gmail.com', '0732872362', 'tải xuống.jfif', 2, '22-11-2021'),
(6, 'Nam', '123456', '3@gmail.com', '', 'DefaultAvt.jpg', 2, '22-11-2021'),
(7, 'hai', '1', '4@gmail.com', '4444', '1686670972921rn_image_picker_lib_temp_4fb40584-0f5b-4641-a4a1-8a8b1e071ee9.jpg', 2, '22-11-2021'),
(8, 'user5', 'q2002', '5@gmail.com', '', 'DefaultAvt.jpg', 2, '22-11-2021'),
(9, 'Hương', '1', 'huong@gmail.com', '', 'DefaultAvt.jpg', 2, '27-11-2021'),
(10, 'Hải', '1', 'hai@gmail.com', '0732872362', '02921180_n.jpg', 2, '27-11-2021'),
(11, 'Khá', '1', 'kha@gmail.com', '', 'DefaultAvt.jpg', 2, '27-11-2021'),
(13, 'Hùng', '1', 'hung@gmail.com', '', 'DefaultAvt.jpg', 2, '28-11-2021'),
(14, 'Nam ', '1', 'nam@gmai.com', '', 'DefaultAvt.jpg', 2, '28-11-2021'),
(15, 'Hiếu', '1', 'hieu@gmail.com', '', 'DefaultAvt.jpg', 2, '28-11-2021'),
(18, 'Diluc', '1', 'diluc@gmail.com', '3974327321', '1109227.jpg', 2, '04-12-2021'),
(19, 'Keqing', '1', 'keqing@gmail.com', '', 'DefaultAvt.jpg', 2, '04-12-2021'),
(20, 'Bé Bo', '1', 'bo@gmail.com', '', 'DefaultAvt.jpg', 2, '04-12-2021'),
(21, 'quyen', '123456', 'quyen@gmail.com', '', '', 2, '28-05-2023'),
(23, 'Quyen', '123456', 'phamquocquyen0202@gmail.com', '', 'DefaultAvt.jpg', 2, '2023-06-14 00:56:20');

-- --------------------------------------------------------

--
-- Table structure for table `ward`
--

CREATE TABLE `ward` (
  `ward_id` int(11) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `district_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ward`
--

INSERT INTO `ward` (`ward_id`, `ward`, `district_id`) VALUES
(1, 'Bình Hiên', 1),
(2, 'Bình Thuận', 1),
(3, 'Hải Châu I', 1),
(4, 'Hải Châu II\r\n', 1),
(5, 'Hòa Cường Bắc', 1),
(6, 'Hòa Cường Nam', 1),
(7, 'Hòa Cường Đông', 1),
(8, 'Hòa Thuận Tây', 1),
(9, 'Nam Dương', 1),
(10, 'Phước Ninh', 1),
(11, 'Thạch Thang', 1),
(12, 'Thanh Bình', 1),
(13, 'Thuận Phước', 1),
(14, 'Hòa An', 2),
(15, 'Hòa Phát', 2),
(16, 'Hòa Thọ Đông', 2),
(17, 'Hòa Thọ Tây', 2),
(18, 'Hòa Xuân', 2),
(19, 'Khuê Trung', 2),
(20, 'An Khê', 3),
(21, 'Chính ', 3),
(22, 'Hòa Khê', 3),
(23, 'Tam Thuận', 3),
(24, 'Tân Chính', 3),
(25, 'Thạc Giác', 3),
(26, 'Thanh Khê Đông', 3),
(27, 'Thanh Khê Tây', 3),
(28, 'Vĩnh Trung', 3),
(29, 'Xuân Hà', 3),
(30, 'Hòa Hiệp Bắc\r\n', 4),
(31, 'Hòa Hiệp Nam\r\n', 4),
(32, 'Hòa Khánh Bắc', 4),
(33, 'Hòa Khánh Nam', 4),
(34, 'Hòa Minh ', 4),
(35, 'Hòa Hải', 5),
(36, 'Hòa Quý', 5),
(37, 'Khuê Mỹ', 5),
(38, 'Mỹ An', 5),
(39, 'An Hải Bắc', 6),
(40, 'An Hải Đông', 6),
(41, 'An Hải Tây', 6),
(42, 'Mân Thái', 6),
(43, 'Nại Hiên Đông', 6),
(44, 'Phước Mỹ', 6),
(45, 'Thọ Quang', 6),
(46, 'Hòa Bắc', 7),
(47, 'Hòa Châu', 7),
(48, 'Hòa Khương', 7),
(49, 'Hòa Liên', 7),
(50, 'Hòa Nhơn', 7),
(51, 'Hòa Ninh', 7),
(52, 'Hòa Phong', 7),
(53, 'Hòa Phú', 7),
(54, 'Hòa Phước', 7),
(55, 'Hòa Sơn', 7),
(56, 'Hòa Tiến', 7),
(57, 'Không có', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_new`
--
ALTER TABLE `cart_new`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `fk_card_user` (`user_id`),
  ADD KEY `fk_card_prd` (`id_prd`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `fk_user_contact` (`user_id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `prd_info`
--
ALTER TABLE `prd_info`
  ADD PRIMARY KEY (`prd_id`),
  ADD KEY `fk_user_prd` (`user_id`),
  ADD KEY `fk_district_prd` (`district_id`),
  ADD KEY `fk_ward_prd` (`ward_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `ward`
--
ALTER TABLE `ward`
  ADD PRIMARY KEY (`ward_id`),
  ADD KEY `district_id` (`district_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_new`
--
ALTER TABLE `cart_new`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `prd_info`
--
ALTER TABLE `prd_info`
  MODIFY `prd_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `ward`
--
ALTER TABLE `ward`
  MODIFY `ward_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_new`
--
ALTER TABLE `cart_new`
  ADD CONSTRAINT `fk_card_prd` FOREIGN KEY (`id_prd`) REFERENCES `prd_info` (`prd_id`),
  ADD CONSTRAINT `fk_card_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `fk_user_contact` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `prd_info`
--
ALTER TABLE `prd_info`
  ADD CONSTRAINT `fk_ward_prd` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`ward_id`);

--
-- Constraints for table `ward`
--
ALTER TABLE `ward`
  ADD CONSTRAINT `ward_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district` (`district_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
