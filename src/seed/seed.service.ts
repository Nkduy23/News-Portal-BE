import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Article } from '../articles/article.entity';
import { ArticleStatus } from '../articles/article.entity';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface RawArticle {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  author?: string;
  articleType?: string;
  tags?: string[];
  status: ArticleStatus;
  isFeatured?: boolean;
  publishedAt: string;
  categorySlug: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    slug: 'dat-nuoc-vao-xuan',
    name: 'Đất nước vào Xuân',
    nameVi: 'Đất nước vào Xuân',
    color: '#E8435A',
  },
  {
    slug: 'ky-uc-lam-bao',
    name: 'Ký ức làm báo',
    nameVi: 'Ký ức làm báo',
    color: '#F97316',
  },
  {
    slug: 'ben-chen-tra-xuan',
    name: 'Bên chén trà Xuân',
    nameVi: 'Bên chén trà Xuân',
    color: '#10B981',
  },
  {
    slug: 'sac-mau-giai-tri',
    name: 'Sắc màu giải trí',
    nameVi: 'Sắc màu giải trí',
    color: '#8B5CF6',
  },
  {
    slug: 'tet-muon-noi',
    name: 'Tết muôn nơi',
    nameVi: 'Tết muôn nơi',
    color: '#EC4899',
  },
  {
    slug: 'khat-vong-viet',
    name: 'Khát vọng Việt',
    nameVi: 'Khát vọng Việt',
    color: '#F59E0B',
  },
  {
    slug: 'cam-nang-tet',
    name: 'Cẩm nang Tết',
    nameVi: 'Cẩm nang Tết',
    color: '#06B6D4',
  },
  {
    slug: 'chuc-xuan',
    name: 'Chúc Xuân',
    nameVi: 'Chúc Xuân',
    color: '#EF4444',
  },
  {
    slug: 'tet-around-town',
    name: 'Tết Around Town',
    nameVi: 'Tết Around Town',
    color: '#3B82F6',
  },
  { slug: 'vovvn', name: 'VOV.VN', nameVi: 'VOV.VN', color: '#14B8A6' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED CONTENT
// ─────────────────────────────────────────────────────────────────────────────
const mockContent = `
<p>Trong không khí tưng bừng của mùa xuân mới, những câu chuyện về con người, về đất nước và về những ký ức đẹp lại trở về rõ nét hơn bao giờ hết. Đây là thời điểm để mỗi người nhìn lại hành trình đã qua, trân trọng những gì mình đang có và hướng tới tương lai với niềm tin và hy vọng.</p>
<p>Theo các chuyên gia văn hóa, mùa Tết không chỉ là dịp nghỉ ngơi mà còn là cơ hội để gắn kết cộng đồng, khơi dậy tình yêu quê hương đất nước. Những hoạt động văn hóa truyền thống được tổ chức rộng rãi đã thu hút hàng nghìn người dân và du khách tham gia, tạo nên bức tranh xuân sôi động và đầy màu sắc.</p>
<p>Với tinh thần "Việt Nam tự cường – Bứt phá vươn xa", xuân Bình Ngọ 2026 hứa hẹn sẽ là một năm bản lề đầy ý nghĩa, mở ra nhiều cơ hội phát triển cho đất nước và mỗi người dân Việt Nam trên toàn thế giới.</p>
`;

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLES
// ─────────────────────────────────────────────────────────────────────────────
const ARTICLES: RawArticle[] = [
  // ── Đất nước vào Xuân ──────────────────────────────────────────────────────
  {
    slug: 'bo-doi-ten-lua-phong-khong-sang-tao-chien-phap',
    title:
      'Bộ đội tên lửa phòng không sáng tạo chiến pháp cho người dân đón Tết, vui Xuân',
    thumbnail: 'https://picsum.photos/seed/hero1/860/500',
    categorySlug: 'dat-nuoc-vao-xuan',
    articleType: 'Quốc phòng',
    publishedAt: '2026-01-25T08:00:00',
    status: 'published',
    isFeatured: true,
    tags: ['quốc phòng', 'tết 2026', 'bộ đội'],
    content: mockContent,
  },
  {
    slug: 'nhung-nguoi-linh-mu-noi-xanh-don-tet',
    title:
      'Những người lính Mũ nồi xanh Việt Nam đón Tết ở nơi cách Tổ quốc vạn dặm',
    excerpt:
      'VOVVN - Không pháo hoa, không có sum vầy. Tất cả những người lính Mũ nồi xanh Việt Nam tại Cộng hòa Trung Phi là cả Tổ quốc, mầm cây quê nhà và những khoảnh khắc lắng nghe về nguồn gốc của mình trong hành trình giữ gìn hòa bình Liên hợp quốc.',
    thumbnail: 'https://picsum.photos/seed/hero2/860/500',
    categorySlug: 'dat-nuoc-vao-xuan',
    articleType: 'Quốc tế',
    publishedAt: '2026-01-25T09:30:00',
    status: 'published',
    isFeatured: true,
    tags: ['mũ nồi xanh', 'liên hợp quốc', 'tết xa nhà'],
    content: mockContent,
  },
  {
    slug: 'gay-can-nhung-keo-vat-doi-nam-nu-ngay-khai-hoi-lang-trieu-khuc',
    title:
      'Gay cấn những keo vật đối nam nữ trong ngày khai hội làng Triệu Khúc',
    excerpt:
      'VOVVN - Trong khuôn khổ lễ hội truyền thống làng Triệu Khúc (phường Thanh Liệt, Hà Nội), những keo vật đối nam nữ hứa hẹn nóng bỏng khi ngày khai hội, trở thành tâm điểm thu hút đông đảo người dân và du khách thập phương.',
    thumbnail: 'https://picsum.photos/seed/dnvx1/640/400',
    categorySlug: 'dat-nuoc-vao-xuan',
    articleType: 'Văn hoá',
    publishedAt: '2026-01-25T07:00:00',
    status: 'published',
    tags: ['lễ hội', 'hà nội', 'vật dân tộc'],
    content: mockContent,
  },
  {
    slug: 'hue-to-chuc-le-hoi-den-huyen-tran-tuong-nho-nguoi-mo-coi',
    title: 'Huế tổ chức lễ hội đến Huyền Trân, tưởng nhớ người mở cõi',
    excerpt:
      'VOVVN - Ngày 29/2, Sở Văn hóa và Thể thao tỉnh Huế tổ chức lễ hội đến Huyền Trân tại Trung tâm Văn hóa Huyền Trân ở núi Ngũ Phong.',
    thumbnail: 'https://picsum.photos/seed/dnvx2/640/400',
    categorySlug: 'dat-nuoc-vao-xuan',
    articleType: 'Văn hoá',
    publishedAt: '2026-01-24T08:00:00',
    status: 'published',
    tags: ['huế', 'lễ hội', 'lịch sử'],
    content: mockContent,
  },
  {
    slug: 'bun-tranh-vo-ngua-tai-le-hoi-truyen-thong-dua-ngua',
    title:
      'Bùn trắng võ ngựa tại Lễ hội truyền thống đua ngựa Gò Thì Thùng xuân Bình Ngọ',
    excerpt:
      'VOVVN - Đã từ ngàn xưa tới nay, ngày mồng 9 tháng Giêng hàng năm tại di tích lịch sử - văn hóa quốc gia đèo Gò Thì Thùng là nơi đua ngựa truyền thống.',
    thumbnail: 'https://picsum.photos/seed/dnvx3/640/400',
    categorySlug: 'dat-nuoc-vao-xuan',
    articleType: 'Thể thao',
    publishedAt: '2026-01-23T09:00:00',
    status: 'published',
    tags: ['đua ngựa', 'lễ hội', 'bình định'],
    content: mockContent,
  },
  {
    slug: 'trai-nghiem-le-hoi-xuong-dong-cao-lan-sac-xuan-lang-ha-noi',
    title:
      'Trải nghiệm lễ hội Xuống Đồng của người Cao Lan trong sắc xuân giữa lòng Hà Nội',
    excerpt:
      'VOVVN - Đồng bào Cao Lan (Phú Thọ) đã tái hiện lễ hội Xuống Đồng tại Làng Văn hóa - Du lịch các dân tộc Việt Nam.',
    thumbnail: 'https://picsum.photos/seed/dnvx4/640/400',
    categorySlug: 'dat-nuoc-vao-xuan',
    articleType: 'Văn hoá',
    publishedAt: '2026-01-22T10:00:00',
    status: 'published',
    tags: ['dân tộc', 'lễ hội', 'hà nội', 'cao lan'],
    content: mockContent,
  },

  // ── Ký ức làm báo ──────────────────────────────────────────────────────────
  {
    slug: 'giai-bao-chi-dien-hong-lan-thu-4-vov-xuat-sac-gianh-2-giai-thuong',
    title: 'Giải báo chí Diên Hồng lần thứ 4: VOV xuất sắc giành 2 giải thưởng',
    excerpt:
      'VOVVN - Lễ trao Giải Báo chí toàn quốc về Quốc hội và Hội đồng nhân dân (Giải Diên Hồng) lần thứ tư năm 2026 đã được tổ chức tối 18/12 tại Cung Văn hóa Lao động Hữu Nghị Việt – Xô (Hà Nội).',
    thumbnail: 'https://picsum.photos/seed/kulb1/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Báo chí',
    author: 'Phóng viên VOV',
    publishedAt: '2026-01-25T18:00:00',
    status: 'published',
    tags: ['giải báo chí', 'VOV', 'diên hồng', 'quốc hội'],
    content: mockContent,
  },
  {
    slug: 'ky-niem-dac-biet-cua-vi-tuong-phi-cong-voi-dai-tuong-vo-nguyen-giap',
    title:
      'Kỷ niệm đặc biệt của vị tướng phi công với Đại tướng Võ Nguyên Giáp',
    excerpt:
      'VOVVN - Việc hai cha con cùng là phi công đối với Thượng tướng Võ Văn Tuấn là sự tiếp nối, kế tục đất tự hào.',
    thumbnail: 'https://picsum.photos/seed/kulb2/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Lịch sử',
    author: 'Thanh Hà',
    publishedAt: '2026-01-25T14:44:00',
    status: 'published',
    tags: ['võ nguyên giáp', 'phi công', 'lịch sử', 'quân đội'],
    content: mockContent,
  },
  {
    slug: 'don-tet-o-truong-sa',
    title: 'Đón Tết ở Trường Sa',
    excerpt:
      'VOVVN - Tiếng chuông chùa, mùi khói hương, sự háo hức vui tươi của trẻ thơ khi diện bộ quần áo mới cho thật chỉnh tề để được mừng tuổi đầu năm.',
    thumbnail: 'https://picsum.photos/seed/kulb3/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Phóng sự',
    author: 'Minh Khoa',
    publishedAt: '2026-01-24T09:00:00',
    status: 'published',
    tags: ['trường sa', 'tết', 'hải quân', 'biển đảo'],
    content: mockContent,
  },
  {
    slug: 'khi-quan-chuc-mua-danh-ba-van-ban-danh-ba-dong',
    title: 'Khi quan chức "Mua danh ba vạn, bán danh ba đồng"',
    excerpt:
      'VOVVN - Khi thực thi công vụ, có những cán bộ hay liên mắt làm quan cách mạng đã vội vàng, rồi lúc hầu tòa thì tìm đủ mọi lý do biện minh.',
    thumbnail: 'https://picsum.photos/seed/kulb4/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Điều tra',
    author: 'Đình Tuấn',
    publishedAt: '2026-01-24T07:30:00',
    status: 'published',
    tags: ['tham nhũng', 'điều tra', 'công vụ', 'pháp luật'],
    content: mockContent,
  },
  {
    slug: 'cay-nuoc-biet-nghe-loi-va-loi-tam-biet-binh-20-lit',
    title: 'Cây nước biết nghe lời và lời tạm biệt bình 20 lít',
    excerpt:
      'VOVVN - Khách vừa bước vào nhà, bạn chỉ cần nói Xin chào FujiHOME, bật chế độ pha trà - và máy tự làm phần còn lại.',
    thumbnail: 'https://picsum.photos/seed/kulb5/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Công nghệ',
    author: 'Lan Anh',
    publishedAt: '2026-01-23T16:00:00',
    status: 'published',
    tags: ['smarthome', 'công nghệ', 'đời sống', 'AI'],
    content: mockContent,
  },
  {
    slug: 'danh-tinh-dien-vien-moi-nhat-thu-vai-james-bond-gay-bat-ngo',
    title: 'Danh tính diễn viên mới nhất thử vai James Bond gây bất ngờ',
    excerpt:
      'VOVVN - Tom Francis, nam diễn viên người Anh nổi lên từ vở nhạc kịch Sunset Boulevard, được cho là đã tham gia thử vai cho nhân vật James Bond tiếp theo.',
    thumbnail: 'https://picsum.photos/seed/kulb6/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Giải trí',
    author: 'Thu Hương',
    publishedAt: '2026-01-22T20:00:00',
    status: 'published',
    tags: ['james bond', 'điện ảnh', 'hollywood', 'giải trí'],
    content: mockContent,
  },
  {
    slug: 'khong-the-lien-lac-scarlett-johansson-dung-luc-phim-moi-gay-sot-o-cannes',
    title:
      'Không thể liên lạc Scarlett Johansson đúng lúc phim mới gây sốt ở Cannes',
    excerpt:
      'VOVVN - Đạo diễn James Gray gây chú ý khi gọi FaceTime cho Scarlett Johansson ngay tại buổi ra mắt phim Paper Tiger ở Liên hoan phim Cannes nhưng nữ diễn viên không nghe máy.',
    thumbnail: 'https://picsum.photos/seed/kulb7/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Giải trí',
    author: 'Thu Hương',
    publishedAt: '2026-01-22T15:30:00',
    status: 'published',
    tags: ['cannes', 'scarlett johansson', 'điện ảnh quốc tế'],
    content: mockContent,
  },
  {
    slug: 'lieu-han-so-hee-ryu-jun-yeol-co-tai-hop-o-cannes',
    title: 'Liệu Han So Hee - Ryu Jun Yeol có tái hợp ở Cannes?',
    excerpt:
      'VOVVN - Sự xuất hiện của Han So Hee tại Liên hoan phim Cannes 2026 đang khiến mạng xã hội Hàn Quốc dậy sóng.',
    thumbnail: 'https://picsum.photos/seed/kulb8/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Giải trí',
    author: 'Minh Anh',
    publishedAt: '2026-01-21T11:00:00',
    status: 'published',
    tags: ['han so hee', 'kpop', 'cannes', 'hàn quốc'],
    content: mockContent,
  },
  {
    slug: 'miu-le-bi-khoi-to-cong-ty-quan-ly-cam-ket-khong-bao-che',
    title:
      'Miu Lê bị khởi tố, công ty quản lý cam kết "không bao che" và xin lỗi khán giả',
    excerpt:
      'VOVVN - Ca sĩ Miu Lê bị khởi tố, bắt tạm giam về hành vi Tổ chức sử dụng trái phép chất ma túy.',
    thumbnail: 'https://picsum.photos/seed/kulb9/640/400',
    categorySlug: 'ky-uc-lam-bao',
    articleType: 'Pháp luật',
    author: 'Hồng Nhung',
    publishedAt: '2026-01-20T08:00:00',
    status: 'published',
    tags: ['miu lê', 'nghệ sĩ', 'pháp luật', 'ma túy'],
    content: mockContent,
  },

  // ── Bên chén trà Xuân ──────────────────────────────────────────────────────
  {
    slug: 'dong-dao-nguoi-dan-doi-mua-du-le-khai-hoi-co-loa',
    title: 'Đông đảo người dân đổi mua dự lễ khai hội Cổ Loa đầu năm',
    excerpt:
      'VOVVN - Lễ hội Cổ Loa không chỉ là hoạt động văn hóa – tín ngưỡng đầu xuân mà còn là dịp khai dậy niềm tự hào và truyền thống.',
    thumbnail: 'https://picsum.photos/seed/bctx1/640/400',
    categorySlug: 'ben-chen-tra-xuan',
    articleType: 'Văn hoá',
    publishedAt: '2026-01-25T06:30:00',
    status: 'published',
    tags: ['cổ loa', 'lễ hội', 'hà nội'],
    content: mockContent,
  },
  {
    slug: 'xuan-van-qua-day',
    title: 'Xuân vẫn qua đây',
    excerpt:
      'VOVVN - Mùa xuân đi qua những cửa thư của Trần Thẳng mang những cảm xúc, đồi đắng, phố, của đất và làng in.',
    thumbnail: 'https://picsum.photos/seed/bctx2/640/400',
    categorySlug: 'ben-chen-tra-xuan',
    articleType: 'Văn học',
    publishedAt: '2026-01-24T09:00:00',
    status: 'published',
    tags: ['thơ', 'xuân', 'văn học'],
    content: mockContent,
  },
  {
    slug: 'nu-hon-nhung-con-dau-khien-nguoi-ta-bung-linh',
    title: '"Nụ hôn" - Như những con đau khiến người ta bùng linh',
    thumbnail: 'https://picsum.photos/seed/bctx3/640/400',
    categorySlug: 'ben-chen-tra-xuan',
    articleType: 'Nghệ thuật',
    publishedAt: '2026-01-23T10:00:00',
    status: 'published',
    tags: ['nghệ thuật', 'hội họa', 'cảm xúc'],
    content: mockContent,
  },
  {
    slug: 'bai-tho-mai-nhu-dom-lua-nho-khuat-tu-dem-den',
    title: 'Bài thơ "Mai" - Như đốm lửa nhỏ khuất từ đêm đen',
    thumbnail: 'https://picsum.photos/seed/bctx4/640/400',
    categorySlug: 'ben-chen-tra-xuan',
    articleType: 'Văn học',
    publishedAt: '2026-01-22T11:00:00',
    status: 'published',
    tags: ['thơ', 'mai', 'mùa xuân'],
    content: mockContent,
  },

  // ── Sắc màu giải trí ───────────────────────────────────────────────────────
  {
    slug: 'anh-tu-atus-va-dau-an-trong-loat-phim-dien-anh-an-khach',
    title: 'Anh Tú Atus và dấu ấn trong loạt phim điện ảnh ăn khách',
    thumbnail: 'https://picsum.photos/seed/smgt1/640/400',
    categorySlug: 'sac-mau-giai-tri',
    articleType: 'Điện ảnh',
    publishedAt: '2026-01-25T12:00:00',
    status: 'published',
    tags: ['điện ảnh', 'anh tú', 'phim tết'],
    content: mockContent,
  },
  {
    slug: 'nguoi-dan-thu-do-no-luc-du-le-hoi-go-dong-da-xuan-binh-ngo',
    title: 'Người dân Thủ đô nỗ lực dự Lễ hội Gò Đống Đa xuân Bình Ngọ 2026',
    thumbnail: 'https://picsum.photos/seed/smgt2/640/400',
    categorySlug: 'sac-mau-giai-tri',
    articleType: 'Văn hoá',
    publishedAt: '2026-01-24T08:00:00',
    status: 'published',
    tags: ['gò đống đa', 'lễ hội', 'hà nội'],
    content: mockContent,
  },
  {
    slug: 've-dien-trai-cua-hai-nam-chinh-trong-phim-tet-tho-oi',
    title: 'Vẻ điển trai của hai nam chính trong phim Tết "Thố ơi!!"',
    thumbnail: 'https://picsum.photos/seed/smgt3/640/400',
    categorySlug: 'sac-mau-giai-tri',
    articleType: 'Điện ảnh',
    publishedAt: '2026-01-24T13:00:00',
    status: 'published',
    tags: ['phim tết', 'thố ơi', 'diễn viên'],
    content: mockContent,
  },
  {
    slug: 'giu-hon-van-hoa-dao-do-tu-nghe-thieu-le-phuc-cap-sac',
    title: 'Giữ hồn văn hóa Dao đỏ từ nghề thiêu lễ phục cấp sắc',
    thumbnail: 'https://picsum.photos/seed/smgt4/640/400',
    categorySlug: 'sac-mau-giai-tri',
    articleType: 'Dân tộc',
    publishedAt: '2026-01-23T07:00:00',
    status: 'published',
    tags: ['dao đỏ', 'thêu thùa', 'dân tộc'],
    content: mockContent,
  },
  {
    slug: 'nhan-sac-nu-dien-vien-dong-cung-voi-nghe-si-xuan-hinh-trong-mui-pho',
    title:
      'Nhan sắc nữ diễn viên đóng cùng với nghệ sĩ Xuân Hinh trong "Mùi phố"',
    thumbnail: 'https://picsum.photos/seed/smgt5/640/400',
    categorySlug: 'sac-mau-giai-tri',
    articleType: 'Điện ảnh',
    publishedAt: '2026-01-23T14:00:00',
    status: 'published',
    tags: ['xuân hinh', 'mùi phố', 'diễn viên'],
    content: mockContent,
  },
  {
    slug: 'le-hoi-tam-blang-mprang-bon-niem-tu-hao-cua-nguoi-m-nong',
    title: "Lễ hội Tâm Blang M'prang bon – Niềm tự hào của người M'nông",
    thumbnail: 'https://picsum.photos/seed/smgt6/640/400',
    categorySlug: 'sac-mau-giai-tri',
    articleType: 'Dân tộc',
    publishedAt: '2026-01-22T09:00:00',
    status: 'published',
    tags: ["m'nông", 'tây nguyên', 'lễ hội'],
    content: mockContent,
  },

  // ── Tết muôn nơi ───────────────────────────────────────────────────────────
  {
    slug: 'don-xuan-que-huong-2026-tai-bangladesh',
    title: 'Đón Xuân Quê hương 2026 tại Bangladesh',
    excerpt:
      'VOVVN - Ngày 6/3 tại thủ đô Dhaka, Đại sứ quán Việt Nam tại Bangladesh và Ban Liên lạc cộng đồng người Việt Nam đã tổ chức chương trình Xuân Quê hương 2026.',
    thumbnail: 'https://picsum.photos/seed/tmn1/640/400',
    categorySlug: 'tet-muon-noi',
    articleType: 'Kiều bào',
    publishedAt: '2026-01-25T10:00:00',
    status: 'published',
    tags: ['kiều bào', 'bangladesh', 'xuân quê hương'],
    content: mockContent,
  },
  {
    slug: 'tet-lang-net-van-hoa-rieng-co-cua-nguoi-dao-quan-chet',
    title: 'Tết làng – Nét văn hóa riêng có của người Dao Quần Chẹt',
    thumbnail: 'https://picsum.photos/seed/tmn2/640/400',
    categorySlug: 'tet-muon-noi',
    articleType: 'Dân tộc',
    publishedAt: '2026-01-24T08:00:00',
    status: 'published',
    tags: ['dao quần chẹt', 'tết làng', 'dân tộc'],
    content: mockContent,
  },
  {
    slug: 'co-yet-thanh-hoang-le-thua-gui-mua-xuan-can-vang-trong-khoi-tet-pho-co',
    title:
      'Cổ Yết Thành Hoàng – Lễ thưa gửi mùa xuân còn vang trong khói Tết phố cổ',
    thumbnail: 'https://picsum.photos/seed/tmn3/640/400',
    categorySlug: 'tet-muon-noi',
    articleType: 'Văn hoá',
    publishedAt: '2026-01-23T09:00:00',
    status: 'published',
    tags: ['tết cổ truyền', 'phố cổ', 'tín ngưỡng'],
    content: mockContent,
  },

  // ── Khát vọng Việt ─────────────────────────────────────────────────────────
  {
    slug: 'tan-thanh-group-hanh-trinh-17-nam-dung-xay-uy-tin-kien-tao-gia-tri-ben-vung',
    title:
      'Tân Thành Group: Hành trình 17 năm dựng xây uy tín, kiến tạo giá trị bền vững',
    excerpt:
      'VOVVN - 17 năm chưa phải là chặng đường quá dài, nhưng Tân Thành Group đã chứng minh năng lực, bản lĩnh bằng sự kiến tạo những công trình điểm nhấn.',
    thumbnail: 'https://picsum.photos/seed/kvv1/640/400',
    categorySlug: 'khat-vong-viet',
    articleType: 'Kinh tế',
    publishedAt: '2026-01-25T08:00:00',
    status: 'published',
    tags: ['bất động sản', 'doanh nghiệp', 'phát triển'],
    content: mockContent,
  },
  {
    slug: 'evgenco2-phat-trien-xanh-ben-vung-dam-an-ninh-nang-luong-quoc-gia',
    title:
      'EVNGENCO2 phát triển xanh, bền vững đảm an ninh năng lượng quốc gia',
    thumbnail: 'https://picsum.photos/seed/kvv2/640/400',
    categorySlug: 'khat-vong-viet',
    articleType: 'Năng lượng',
    publishedAt: '2026-01-24T09:00:00',
    status: 'published',
    tags: ['năng lượng xanh', 'evn', 'bền vững'],
    content: mockContent,
  },
  {
    slug: 'ford-viet-nam-dat-doanh-so-ky-luc-hon-50000-xe-nam-2025',
    title: 'Ford Việt Nam đạt doanh số kỷ lục – hơn 50.000 xe năm 2025',
    thumbnail: 'https://picsum.photos/seed/kvv3/640/400',
    categorySlug: 'khat-vong-viet',
    articleType: 'Kinh tế',
    publishedAt: '2026-01-23T10:00:00',
    status: 'published',
    tags: ['ford', 'ô tô', 'doanh số', 'kỷ lục'],
    content: mockContent,
  },

  // ── Cẩm nang Tết ───────────────────────────────────────────────────────────
  {
    slug: 'ban-van-hoa-du-lich-phieng-loi-don-xuan-sang',
    title: 'Bản văn hóa du lịch Phiềng Lơi đón xuân sang',
    excerpt:
      'VOVVN - Cách trung tâm thành phố Điện Biên Phủ chừng 7km, bản văn hóa du lịch Phiềng Lơi được biết đến là điểm đến lý tưởng với du khách.',
    thumbnail: 'https://picsum.photos/seed/cnt1/640/400',
    categorySlug: 'cam-nang-tet',
    articleType: 'Du lịch',
    publishedAt: '2026-01-25T07:00:00',
    status: 'published',
    tags: ['điện biên', 'du lịch', 'tây bắc'],
    content: mockContent,
  },
  {
    slug: 'vi-sao-khong-nen-an-qua-nhieu-thit-bo',
    title: 'Vì sao không nên ăn quá nhiều thịt bò',
    thumbnail: 'https://picsum.photos/seed/cnt2/640/400',
    categorySlug: 'cam-nang-tet',
    articleType: 'Sức khỏe',
    publishedAt: '2026-01-24T08:00:00',
    status: 'published',
    tags: ['sức khỏe', 'dinh dưỡng', 'tết'],
    content: mockContent,
  },
  {
    slug: 'viet-nam-co-the-mau-tim-gia-re-bo-duong-ngua-ung-thu',
    title: 'Việt Nam có thể mẫu tím giá rẻ, béo bở đứng lại ngựa cả ung thư',
    thumbnail: 'https://picsum.photos/seed/cnt3/640/400',
    categorySlug: 'cam-nang-tet',
    articleType: 'Sức khỏe',
    publishedAt: '2026-01-23T09:00:00',
    status: 'published',
    tags: ['sức khỏe', 'y tế', 'ung thư'],
    content: mockContent,
  },

  // ── Tết Around Town ────────────────────────────────────────────────────────
  {
    slug: 'crowds-gather-at-hanoi-temples-for-first-full-moon-festival',
    title:
      'Crowds gather at Hanoi temples, pagodas for First Full Moon Festival prayers',
    thumbnail: 'https://picsum.photos/seed/tat1/640/400',
    categorySlug: 'tet-around-town',
    articleType: 'Culture',
    publishedAt: '2026-01-25T08:00:00',
    status: 'published',
    tags: ['pagoda', 'hanoi', 'full moon festival'],
    content: mockContent,
  },
  {
    slug: 'why-the-full-moon-of-the-first-lunar-month-matters-so-much-in-vietnam',
    title:
      'Why the Full Moon of the First Lunar Month matters so much in Vietnam',
    thumbnail: 'https://picsum.photos/seed/tat2/640/400',
    categorySlug: 'tet-around-town',
    articleType: 'Culture',
    publishedAt: '2026-01-25T09:00:00',
    status: 'published',
    tags: ['lunar new year', 'tradition', 'vietnam'],
    content: mockContent,
  },
  {
    slug: 'thousands-flock-to-once-a-year-vieng-market-for-overnight-spring-fair',
    title:
      'Thousands flock to once-a-year Vieng Market for overnight spring fair',
    thumbnail: 'https://picsum.photos/seed/tat3/640/400',
    categorySlug: 'tet-around-town',
    articleType: 'Travel',
    publishedAt: '2026-01-24T10:00:00',
    status: 'published',
    tags: ['vieng market', 'spring fair', 'nam ha'],
    content: mockContent,
  },
  {
    slug: 'ho-chi-minh-city-attractions-see-20-percent-surge-in-visitors-during-tet',
    title: 'Ho Chi Minh City attractions see 20% surge in visitors during Tết',
    excerpt:
      'VOVVN – Major entertainment venues in Ho Chi Minh City were filled with families and tourists enjoying the festive atmosphere on February 21.',
    thumbnail: 'https://picsum.photos/seed/tat4/640/400',
    categorySlug: 'tet-around-town',
    articleType: 'Travel',
    publishedAt: '2026-01-24T14:00:00',
    status: 'published',
    isFeatured: true,
    tags: ['ho chi minh city', 'tourism', 'tet'],
    content: mockContent,
  },
  {
    slug: 'traditional-attire-finds-new-life-in-modern-cultural-landscape',
    title: 'Traditional attire finds new life in modern cultural landscape',
    excerpt:
      'VOVVN – In recent years, traditional Vietnamese attire has re-emerged vibrantly in urban cultural life.',
    thumbnail: 'https://picsum.photos/seed/tat5/640/400',
    categorySlug: 'tet-around-town',
    articleType: 'Culture',
    publishedAt: '2026-01-23T11:00:00',
    status: 'published',
    tags: ['ao dai', 'traditional', 'fashion'],
    content: mockContent,
  },

  // ── Chúc Xuân ──────────────────────────────────────────────────────────────
  {
    slug: 'nghe-si-xuan-hinh-hoa-minsy-chuc-tet-doc-gia-vov-xuan-binh-ngo-2026',
    title:
      'Nghệ sĩ Xuân Hinh, Hòa Minzy... chúc Tết độc giả VOV xuân Bình Ngọ 2026',
    thumbnail: 'https://picsum.photos/seed/cx1/640/400',
    categorySlug: 'chuc-xuan',
    articleType: 'Giải trí',
    publishedAt: '2026-01-25T06:00:00',
    status: 'published',
    tags: ['chúc tết', 'nghệ sĩ', 'xuân 2026'],
    content: mockContent,
  },
  {
    slug: 'khuat-van-khang-va-cac-vdv-chuc-tet-vov',
    title:
      'Khuất Văn Khang và các VĐV thể thao Việt Nam chúc Tết độc giả VOV.VN',
    thumbnail: 'https://picsum.photos/seed/cx2/640/400',
    categorySlug: 'chuc-xuan',
    articleType: 'Thể thao',
    publishedAt: '2026-01-25T07:00:00',
    status: 'published',
    tags: ['thể thao', 'vận động viên', 'chúc tết'],
    content: mockContent,
  },
  {
    slug: 'dan-nghe-si-viet-gui-loi-chuc-tet-gia-bao-dien-tu-vov-xuan-at-ty-2025',
    title:
      'Dàn nghệ sĩ Việt gửi lời chúc Tết đến gia báo Điện tử VOV Xuân Ất Tỵ 2025',
    thumbnail: 'https://picsum.photos/seed/cx3/640/400',
    categorySlug: 'chuc-xuan',
    articleType: 'Giải trí',
    publishedAt: '2026-01-24T08:00:00',
    status: 'published',
    isFeatured: true,
    tags: ['chúc xuân', 'nghệ sĩ', 'vov'],
    content: mockContent,
  },
  {
    slug: 'nhung-loi-chuc-tet-binh-ngo-2026-hay-doc-dao-va-9-nghia-nhat',
    title: 'Những lời chúc Tết Bình Ngọ 2026 hay, độc đáo và ý nghĩa nhất',
    thumbnail: 'https://picsum.photos/seed/cx4/640/400',
    categorySlug: 'chuc-xuan',
    articleType: 'Đời sống',
    publishedAt: '2026-01-24T10:00:00',
    status: 'published',
    tags: ['lời chúc', 'tết 2026', 'bình ngọ'],
    content: mockContent,
  },
  {
    slug: 'video-chu-tich-nuoc-luong-cuong-chuc-tet-giao-thoi-xuan-at-ty-2025',
    title: 'Video Chủ tịch nước Lương Cường chúc Tết giao thời Xuân Ất Tỵ 2025',
    thumbnail: 'https://picsum.photos/seed/cx5/640/400',
    categorySlug: 'chuc-xuan',
    articleType: 'Chính trị',
    publishedAt: '2026-01-23T20:00:00',
    status: 'published',
    isFeatured: true,
    tags: ['chủ tịch nước', 'chúc tết', 'giao thừa'],
    content: mockContent,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED SERVICE
// ─────────────────────────────────────────────────────────────────────────────
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category) private catRepo: Repository<Category>,
    @InjectRepository(Article) private artRepo: Repository<Article>,
  ) {}

  async onApplicationBootstrap() {
    const catCount = await this.catRepo.count();
    if (catCount > 0) return; // Already seeded

    console.log('🌱 Seeding database...');

    // 1. Seed categories
    const cats = await this.catRepo.save(
      CATEGORIES.map((c) => this.catRepo.create(c)),
    );
    const catMap = Object.fromEntries(cats.map((c) => [c.slug, c]));

    // 2. Seed articles
    let count = 0;
    for (const raw of ARTICLES) {
      const cat = catMap[raw.categorySlug];
      if (!cat) {
        console.warn(`⚠️  Category not found for slug: ${raw.categorySlug}`);
        continue;
      }

      const art = this.artRepo.create({
        slug: raw.slug,
        title: raw.title,
        excerpt: raw.excerpt ?? null,
        content: raw.content ?? null,
        thumbnail: raw.thumbnail ?? null,
        author: raw.author ?? null,
        articleType: raw.articleType ?? null,
        tags: raw.tags ?? [],
        status: raw.status,
        isFeatured: raw.isFeatured ?? false,
        publishedAt: new Date(raw.publishedAt),
        categorySlug: cat.slug,
        categoryName: cat.nameVi,
        category: cat,
      });

      await this.artRepo.save(art);
      count++;
    }

    console.log(`✅ Seeded ${cats.length} categories, ${count} articles`);
  }
}
