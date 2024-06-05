const crypto = require('crypto');
const storeData = require('../services/storeData');
const connectDB = require('../Controllers/connectDatabase')
const {handleServerError,handleDatabaseError} = require('../Controllers/errorHandler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const { getMessageStatus, postScanSkinInformation, postScanSkinDisease } = require('../services/scanService');


const scanPredictHandler = async (request, h) => {
     const { image } = request;
     const { model } = request;

     try {
          const id = crypto.randomUUID();
          const message = await getMessageStatus();
          const skinCondition = await postScanSkinInformation(model, image);
          const disease = await postScanSkinDisease(model, image);
          const createdAt = new Date().toISOString();
         
          const data = {
               "id-scan":id,
               "message-scan": message,
               "prediction" : {
                    "status-kulit": skinCondition, 
                    "status-penyakit": disease, 
               },
               "Scan-Date":createdAt,
          }
     
          await storeData(id, data);
          
          return h.response({
               scanStatus: "Scan succesfully!!",
               data: data,
          }).code(201)
     } catch (error) {
          await handleServerError(h,error);
     }


}

const getProducts = async () => {
     try {
          const products = [
               {
                    nama: 'Produk 1',
                    thumbnail: 'url_to_thumbnail',
                    rating: 4.0,
                    deskripsi: 'Deskripsi produk 1',
                    harga: 200000,
                    images: ['url_image_1', 'url_image_2'],
                    link: 'link_to_product1',
                    tipe: 'oily'
                },
                {
                    nama: 'Produk 2',
                    thumbnail: 'url_to_thumbnail',
                    rating: 4.0,
                    deskripsi: 'Deskripsi produk 2',
                    harga: 200000,
                    images: ['url_image_1', 'url_image_2'],
                    link: 'link_to_product2',
                    tipe: 'normal'
                },
                {
                    nama: 'Produk 3',
                    thumbnail: 'url_to_thumbnail',
                    rating: 4.0,
                    deskripsi: 'Deskripsi produk 3',
                    harga: 200000,
                    images: ['url_image_1', 'url_image_2'],
                    link: 'link_to_product3',
                    tipe: 'acne'
                },
                {
                    nama: 'Produk 4',
                    thumbnail: 'url_to_thumbnail',
                    rating: 4.0,
                    deskripsi: 'Deskripsi produk 4',
                    harga: 200000,
                    images: ['url_image_1', 'url_image_2'],
                    link: 'link_to_product4',
                    tipe: 'dry'
                }
          ]
          
          return h.response({
               status: "success",
               data: products,
          }).code(200);

     } catch (error) {
          await handleServerError(h,error);
     }
}


const getArticles = async (request, h) => {
     try {
          const articles = [
               {
                    //Kulit Kering
                    judul: 'Kulit Wajah Kering? Kenali Penyebab dan Cara Mengatasinya',
                    foto: 'https://1.bp.blogspot.com/-iwvVL2qZcok/XRYRx7AZtVI/AAAAAAAAANE/iqBWMYmYQYoLyV1Pd5ToaM2invT6QErYQCLcBGAs/s1600/Pakai-Kosmetik-untuk-Kulit-Kering.jpg',
                    isi: "Perawatan kulit wajah merupakan salah satu langkah penting untuk mendapatkan kulit wajah yang halus dan kencang. Hanya saja, kulit kemungkinan kehilangan cairan akibat kondisi tertentu, sehingga menjadikannya tampak kering. Agar masalah kulit kering dapat dihindari, Anda perlu tahu cara mengatasi dan merawatnya.\n\nPerawatan kulit wajah perlu dilakukan untuk mengurangi risiko mengalami kulit kering. Sebab, semakin bertambahnya usia, risiko untuk mengalami kulit kering akan lebih besar. Tanda bahwa kulit mengalami kekeringan bisa berupa permukaan kulit wajah yang terasa kasar, mengelupas, pecah-pecah dan terasa gatal.\n\n**Cara Mengatasi Kulit Wajah Kering**\n\nBeberapa kebiasaan berikut dapat dilakukan sebagai perawatan kulit wajah untuk memperbaiki kondisi atau tipe kulit wajah kering:\n\n1. Basuh wajah dengan air biasa\n\nHindari penggunaan air panas karena dapat memperburuk kondisi kulit yang kering. Saat mandi, sebaiknya batasi waktu mandi hanya sekitar 5-10 menit.\n\n2. Cermat memilih pembersih wajah\n\nGunakan produk sabun pembersih wajah yang lembut dan tanpa tambahan pengharum, tujuannya adalah agar kulit Anda terhindar dari iritasi kulit yang dapat menyebabkan kulit semakin kering. Micellar water juga dapat dijadikan pilihan sebagai pembersih wajah sebelum menggunakan sabun pembersih wajah.\n\n3. Segera pakai pelembap setelah mencuci wajah\n\nLebih baik memilih pelembap dalam bentuk krim atau salep untuk wajah kering, dibandingkan bentuk lotion. Untuk menjaga kelembapan kulit wajah, Anda juga bisa menggunakan hydrating toner.\n\n4. Pilih pelembap yang mengandung minyak alami\n\nMisalnya, pelembap dengan minyak zaitun atau minyak jojoba. Selain itu, bahan lain yang juga dapat membantu kulit kering adalah lactic acid, hyaluronic acid, gliserin, lanolin, minyak mineral dan petrolatum.\n\n5. Gunakan pelembap dengan tekstur berminyak dan kental\n\nSebelum membeli, coba oleskan di telapak tangan, kemudian balikkan tangan Anda. Jika pelembap menetes berarti belum cukup kental untuk kulit kering.\n\n6. Waspadai produk yang dapat membuat kulit kering\n\nBeberapa produk yang sebaiknya tidak digunakan untuk Anda yang berkulit kering, misalnya produk yang mengandung alkohol, pengharum, retinoid dan alpha-hydroxy acid (AHA).\n\n**Kapan Harus Dilakukan Pemeriksaan?**\n\nJika perawatan kulit wajah kering telah dilakukan, hasilnya biasanya akan tampak setelah beberapa waktu. Namun, jika kulit semakin kering dan menimbulkan keluhan seperti gatal atau kulit menjadi merah, sebaiknya segera konsultasikan ke dokter kulit.\n\nWaspadai kemungkinan kulit kering sebagai tanda adanya gangguan kesehatan pada tubuh. Dokter akan melakukan pemeriksaan dan memberikan krim atau salep yang dapat membantu mengatasi keluhan pada kulit, dan menangani penyebab utamanya, apabila ada.\n\nSelain mengganggu penampilan, kulit wajah kering dapat mengganggu dan menimbulkan rasa tidak nyaman. Karena itu, penting untuk mengatasi dan merawat kulit wajah kering dengan cermat. Pastikan Anda minum air putih yang cukup dan mengonsumsi banyak buah serta sayur-sayuran, juga menghindari kebiasaan merokok yang dapat berdampak pada kulit. Terapkan pola hidup sehat untuk membantu menjaga kondisi kulit yang sehat.",
                    author: 'dr. Merry Dame Cristy Pane',
                    tahun: 2024
               },
               {
                    //Kulit Berminyak
                    judul: 'Kulit Wajah Berminyak sehat atau penyakit?',
                    foto: 'https://www.um-surabaya.ac.id/uploads/home/gambar_konten/foto_konten-dosen-fk-um-surabaya-bagikan-5-tips-atasi-masalah-kulit-berminyak-secara-alami-admin-dypcQx.webp',
                    isi: "Ciri-ciri kulit berminyak penting untuk dikenali karena tipe kulit ini bisa menimbulkan berbagai masalah kulit, seperti komedo dan jerawat, terutama jika perawatannya kurang tepat. Kulit beminyak juga bisa lebih mudah tampak kusam, jika kebersihannya tidak terjaga.\n\nDi kulit, minyak (sebum) sebenernya berperan untuk melindungi dan menjaga kelembapan kulit. Namun, ketika diproduksi secara berlebih, minyak bisa mengganggu penampilan, bahkan memicu masalah kulit, seperti jerawat.\n\nOleh karena itu, mengenali ciri-ciri kulit berminyak begitu penting supaya Anda bisa melakukan perawatan kulit yang tepat.\n\n**Ini Ciri-Ciri Kulit Berminyak**\n\nKulit berminyak terjadi ketika kelenjar minyak (sebasea) di kulit menghasilkan minyak secara berlebihan. Hal ini bisa menimbulkan ciri-ciri kulit berminyak berupa kulit yang mengilap dan licin atau make up cepat hilang saat digunakan. Berikut ini adalah penjelasannya:\n\n1. Wajah tampak mengilap\nCiri-ciri kulit berminyak yang paling utama ialah wajah tampak mengilap, terutama di zona T, yaitu dahi, hidung, dan dagu. Hal ini terjadi karena kelenjar minyak memproduksi minyak secara berlebih sehingga membuat wajah menjadi lebih berminyak.\n\n2. Pori-pori besar\nPemilik kulit berminyak lebih rentan memiliki pori-pori besar. Hal ini karena minyak berlebih akan menumpuk di pori-pori kulit, sehingga membuat pori-pori membesar.\n\n3. Banyak komedo\nCiri-ciri kulit berminyak juga ditandai dengan banyaknya komedo di wajah. Kondisi ini terjadi akibat minyak berlebih di wajah bercampur dengan tumpukan sel-sel kulit mati dan debu di permukaan kulit.\n\n4. Sering berjerawat\nSelain mudah muncul komedo, kulit berminyak juga cenderung lebih sering berjerawat. Alasannya tidak jauh berbeda dengan penyebab munculnya komedo. Jerawat dapat muncul ketika minyak berlebih di wajah dan sel kulit mati menyumbat pori-pori dan mungkin terinfeksi bakteri.\n\n5. Make-up lebih cepat hilang\nLayaknya air, minyak juga dapat meluruhkan riasan atau make-up. Oleh karena itu, pemilik kulit berminyak cenderung mempunyai masalah terkait riasan wajah, yaitu make up yang digunakan cepat luntur.\n\n6. Kulit licin saat disentuh\nKulit berminyak cenderung licin ketika disentuh. Ciri-ciri kulit berminyak ini dapat timbul akibat produksi minyak berlebih di wajah. Selain itu, jika menempelkan kertas minyak ke wajah, kertas tersebut akan cepat basah.\n\n**Cara Merawat Kulit Berminyak**\n\nBila ciri-ciri kulit berminyak tersebut dialami, kemungkinan besar Anda memiliki jenis kulit berminyak. Kulit berminyak perlu untuk dirawat dengan tepat supaya produksi minyak di wajah bisa lebih terkontrol.\n\nBerikut ini adalah beberapa cara merawat kulit berminyak:\n\n1. Mencuci wajah 2 kali sehari, yaitu pada pagi dan malam sebelum tidur, terutama setelah banyak berkeringat\n2. Membersihkan wajah dengan produk pembersih wajah yang dapat menekan produksi minyak berlebih, contohnya pembersih wajah yang mengandung asam salisilat atau sulfur\n3. Menggunakan skincare berbahan kimia lembut, bebas parfum, dan bebas minyak, serta berlabel noncomedogenic\n4. Mengoleskan pelembap yang tidak mengandung minyak setelah membersihkan wajah\n5. Menggunakan sunscreen saat beraktivitas di luar ruangan pada siang hari\n6. Melakukan eksfoliasi wajah 2-3 kali dan memakai masker 1-2 kali dalam seminggu\n7. Memakai make-up khusus untuk kulit berminyak\n8. Mengonsumsi air putih setidaknya 8 gelas sehari\n\nKulit berminyak membutuhkan perhatian khusus karena lebih rentan berjerawat. Oleh karena itu, kenali ciri-ciri kulit berminyak dengan baik supaya Anda dapat merawatnya dengan tepat.\n\nBila perawatan tersebut sudah diterapkan tetapi ciri-ciri kulit berminyak tak juga tertangani, sebaiknya konsultasikan ke dokter. Dokter akan merekomendasikan perawatan yang sesuai dengan kondisi kulit Anda. Dengan demikian, kulit menjadi lebih terawat dan sehat.",
                    author: 'dr. Kevin Adrian',
                    tahun: 2023
               },
               {
                    //Kulit Normal
                    judul: 'Ciri-Ciri Kulit Sehat Terawat yang Perlu Diketahui',
                    foto: 'https://storage.googleapis.com/base-blog-images/blog-4df5b154-0.jpg',
                    isi: "Punya kulit yang sehat merupakan impian semua orang. Namun, tahukah Anda seperti apa kulit yang sehat itu dan apakah kulit selalu harus putih bersih? Untuk tahu jawabannya, ketahui sejumlah ciri-ciri kulit sehat terawat berikut.\n\n**Ciri-ciri kulit sehat**\n\nPada dasarnya, kulit yang sehat itu bebas dari berbagai masalah kulit seperti gatal, ruam, atau penyakit kulit panu. Penting untuk tahu apakah kulit Anda sehat atau tidak karena informasi ini membantu Anda memilih produk perawatan kulit yang tepat. Beberapa kondisi kulit di bawah ini bisa menjadi patokan dalam mengukur kesehatan kulit Anda.\n\n1. Warna kulit merata\nSetiap orang memiliki tipe kulit yang beragam. Itulah mengapa warna kulit jadi tolok ukur kesehatan kulit. Kulit yang sehat memiliki ciri warna kulit—baik hitam, putih, kuning langsat, maupun sawo matang—yang merata. Artinya, tidak ada perbedaan warna yang kontras di bagian tubuh Anda.\n\n2. Tekstur kulit kenyal\nCiri-ciri kulit sehat berikutnya adalah terasa kenyal. Anda bisa mengecek kekenyalan kulit dengan mencubit pipi perlahan. Jika kenyal, kulit pipi terasa lembut dan elastis. Elastisitas kulit ini bisa muncul jika kulit terhidrasi dengan baik, serta dijaga kelembapannya.\n\n3. Kulit terhidrasi dengan baik\nKulit yang sehat semestinya terasa lembap karena artinya asupan air untuk kulit terpenuhi. Air menjaga keseimbangan sebum di permukaan kulit sehingga mencegah munculnya jerawat atau kulit berminyak, serta berperan penting dalam produksi kolagen.\n\n4. Tidak merasakan sensasi pada kulit\nCiri-ciri kulit sehat berikutnya adalah tidak muncul sensasi aneh atau tidak nyaman pada kulit. Anda perlu memperhatikan produk perawatan kulit yang digunakan. Tanda produk perawatan kulit tidak cocok, mungkin akan menimbulkan sensasi seperti gatal, rasa panas terbakar, atau kencang seperti tertarik.\n\n5. Tidak berjerawat dan garis halus\nKulit sehat tidak memiliki jerawat, bekas luka, komedo, garis-garis halus, atau iritasi. Untuk menjaga kulit wajah agar bebas kerutan adalah dengan rutin menggunakan tabir surya.\n\n6. Bercahaya dan segar\nGlowing skin atau kulit bercahaya adalah ciri-ciri kulit wajah sehat berikutnya. Kulit ini bebas dari sel kulit mati yang menyebabkan kulit kusam. Rutin mencuci wajah dengan cara double cleansing akan membantu wajah menjadi terlihat lebih segar dan cerah menawan.\n\n7. Kulit terasa lembut dan halus\nCiri-ciri kulit wajah sehat selanjutnya adalah wajah lembut dan halus saat disentuh. Untuk mendapatkan kulit halus dan lembut, Anda perlu eksfoliasi wajah secara rutin dan tepat.\n\n**Cara mendapatkan kulit sehat**\n\nAda tiga hal dasar yang perlu dilakukan demi memperoleh kulit sehat, yaitu membersihkan, menjaga kelembapan, dan melindunginya. Selain itu Anda juga dapat mencoba tips menjaga kesehatan kulit berikut:\n\n- Terapkan pola makan sehat.\n- Tidak merokok.\n- Kelola stres sebaik mungkin. \n- Lebih banyak beraktivitas fisik.\n- Tidur yang cukup.\n- Hindari alkohol.\n- Lindungi kulit dari sinar matahari.\n- Cuci muka dengan benar.\n- Gunakan pelembap sesuai jenis kulit.\n- Hindari produk yang bisa mengiritasi kulit.\n\nApakah Anda sudah merasa kulit wajah Anda memenuhi ciri-ciri kulit sehat di atas tadi? Apabila belum kenali kembali tipe dan kondisi kulit Anda untuk mendapatkan produk perawatan kulit yang tepat.",
                    author: 'Aprinda Puji',
                    tahun: 2024
               },
               {
                    //Kulit Berjerawat
                    judul: 'Mengenal Jerawat dan Cara Mengatasinya',
                    foto: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1655092166/attached_image/jerawat-0-alodokter.jpg',
                    isi: "Jerawat adalah masalah kulit yang terjadi ketika pori-pori kulit, tepatnya folikel rambut, tersumbat oleh kotoran, debu, minyak, atau sel kulit mati. Akibatnya, terjadi peradangan pada pori-pori tersebut dan bisa juga disertai infeksi. Jerawat sering muncul di wajah, leher, punggung, atau dada.\n\nJerawat disebut juga acne vulgaris. Masalah kulit ini dapat dialami oleh siapa saja, tetapi umumnya pertama kali muncul di masa pubertas, yaitu usia 10-18 tahun. Kondisi jerawat cenderung lebih parah pada remaja laki-laki dan orang yang memiliki tipe kulit berminyak.\n\nJerawat merupakan masalah kulit yang sangat umum, terutama pada orang yang berusia 11-30 tahun. Bahkan, hampir setiap orang pernah mengalami jerawat.\n\n**Penyebab dan Gejala Jerawat**\n\nJerawat disebabkan oleh penyumbatan di pori-pori kulit, tepatnya di akar rambut (folikel rambut). Pada folikel rambut, terdapat kelenjar minyak (kelenjar sebasea) yang normalnya memproduksi minyak (sebum) untuk menjaga kelembapan dan melindungi kulit.\n\nJerawat timbul jika saluran keluar minyak tersebut tersumbat akibat produksi minyak yang berlebihan, penumpukan sel-sel kulit mati, atau infeksi bakteri.\n\nJerawat muncul berupa bintik komedo atau benjolan pada area kulit yang banyak memiliki folikel rambut, seperti wajah, di dalam hidung, leher, bahu, dada, dan punggung. Bentuk dan ukuran jerawat tergantung pada tingkat keparahannya, mulai dari komedo hitam atau komedo putih, benjolan kecil kemerahan (papula dan pustula), hingga benjolan besar berisi nanah (kista).\n\nKomedo biasanya tidak terasa nyeri. Sebaliknya, jerawat berupa benjolan besar bisa terasa nyeri ketika disentuh. Terkadang, jerawat juga bisa muncul di dahi.\n\n**Pengobatan dan Pencegahan Jerawat**\n\nPengobatan jerawat disesuaikan dengan tingkat keparahan kondisinya. Pengobatan jerawat terbagi menjadi dua, yaitu pemberian obat untuk mengatasi atau menghilangkan jerawat, dan terapi estetika untuk membantu pengobatan jerawat serta memperbaiki penampilan kulit.\n\nObat jerawat dapat berupa obat oles mengandung tretinoin atau benzoyl peroxide, isotretinoin, obat antibiotik minum, serta terapi hormon.\n\nSementara terapi estetika untuk jerawat dapat berupa chemical peeling, terapi laser, dan pengangkatan komedo. Terapi laser dan mikrodermabrasi juga dapat dilakukan untuk mengatasi bekas jerawat.\n\nCara mencegah jerawat adalah rutin membersihkan wajah, tubuh, dan rambut menggunakan sabun pembersih wajah, sabun mandi, atau sampo yang sesuai dengan tipe kulit atau rambut. Jerawat juga dapat dicegah dengan menggunakan produk skincare dan kosmetik yang noncomedogenic, menerapkan pola makan sehat, serta mengelola stres dengan baik.",
                    author: 'dr. Pittara',
                    tahun: 2024
               }
          ]
     
          return h.response({
               status: "success",
               data: articles,
          }).code(200);

     } catch (error) {
          await handleServerError(h,error);
     }

}

const getSkins = async (request, h) => {
     try {
          const skins = [
               {
                    nama: 'Normal',
                    foto: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1638785333/dq3gwme8jql8qpqqcvo2.jpg',
                    deskripsi: `Kulit normal cenderung memiliki ciri kelembapan yang pas serta terasa kenyal, sehingga tipe kulit wajah seperti ini jarang memiliki masalah kulit wajah`,
                    artikel: 'https://www.alodokter.com/cara-mengetahui-jenis-kulit-wajah-dengan-tepat'
                },
                {
                    nama: 'Jerawat',
                    foto: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1677459018/attached_image/jerawat-nodul-kenali-penyebab-dan-pengobatannya.jpg',
                    deskripsi: `Jerawat adalah masalah kulit yang terjadi ketika pori-pori kulit, tepatnya folikel rambut, tersumbat oleh kotoran, debu, minyak, atau sel kulit mati. 
                    Akibatnya, terjadi peradangan pada pori-pori tersebut dan bisa juga disertai infeksi. Jerawat sering muncul di wajah, leher, punggung, atau dada.`,
                    artikel: 'https://www.alodokter.com/jerawat'
                },
                {
                    nama: 'Kering',
                    foto: 'https://asset-2.tstatic.net/shopping/foto/bank/images/5-rekomendasi-moisturizer-untuk-cocok-untuk-kulit-kering-dan-sering-mengelupas.jpg',
                    deskripsi: `Tipe kulit kering pada dasarnya cenderung bersisik atau memiliki permukaan yang kasar, dengan pori-pori yang mudah terlihat akibat kelembapan kulit yang rendah. 
                    Kulit jenis ini mudah mengalami iritasi dengan tanda tanda memerah, gatal dan meradang sehingga dapat memicu timbulnya jerawat.`,
                    artikel: 'https://www.alodokter.com/kulit-wajah-kering-merusak-kepercayaan-diri'
                },
                {
                    nama: 'Berminyak',
                    foto: 'https://foto.kontan.co.id/dEsO-KEowfAfJ1u5dhy0uPkJeOA=/smart/filters:format(webp)/2023/09/21/1345898760p.jpg',
                    deskripsi: `Kulit berminyak merupakan kondisi ketika kelenjar sebasea pada kulit menghasilkan terlalu banyak sebum. 
                    Sebum adalah minyak alami yang berfungsi melapisi kulit dan rambut. Produksi sebum berlebih membuat kulit terlihat mengkilap dan berkilau. 
                    Sebum sebenarnya membantu merawat kulit tetap lembap. Akan tetapi, minyak yang terlalu banyak justru dapat memicu masalah baru, terutama jerawat. 
                    Ini disebabkan karena kotoran lebih mudah menempel pada kulit hingga akhirnya menyumbat pori.`,
                    artikel: 'https://hellosehat.com/penyakit-kulit/perawatan-kulit/kulit-berminyak/'
                }
          ]

          return h.response({
               status: "success",
               data: skins,
          }).code(200);

     } catch (error) {
          await handleServerError(h,error);
     }
}

const loginUser = async (request, h) => {
     const { email, password } = request.payload;

     try {
          const connection = await mysql.createConnection(dbConfig);
          
          const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
          const user = rows[0];
          
          if (!user) {
               return h.response({ message: 'Invalid email or password' }).code(401);
          }
          
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
               return h.response({ message: 'Invalid email or password' }).code(401);
          }
          
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
          
          return h.response({ token }).code(200);

     } catch (error) {
          await handleDatabaseError(h,error);
     }

}

const registerUser = async (request, h) => {
     const { name, email, password } = request.payload;

     try {
          const connection =  await mysql.createConnection(connectDB);
     
          const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
          if (rows.length > 0) {
               return h.response({ 
                    status: 'fail',
                    message: 'Email already exists' 
               }).code(400);
          }
     
          const hashedPassword = await bcrypt.hash(password, 10);
     
          await connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
     
          return h.response({ 
               status: 'success',
               message: 'User registered successfully' 
          }).code(201);

     } catch (error) {
          await handleDatabaseError(h,error);
     }

}

module.exports = {scanPredictHandler, getProducts, getArticles, getSkins, loginUser, registerUser};