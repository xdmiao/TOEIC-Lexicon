
import { Word } from './types';

export const TOEIC_VOCABULARY: Omit<Word, 'id' | 'difficulty' | 'categoryId'>[] = [
  { 
    word: "Abide by", 
    phonetic_us: "əˈbaɪd baɪ", 
    phonetic_uk: "əˈbaɪd baɪ", 
    definition: "遵守，依从", 
    example_en: "Both parties must abide by the terms of the agreement.", 
    example_zh: "双方必须遵守协议条款。" 
  },
  { 
    word: "Agreement", 
    phonetic_us: "əˈɡrimənt", 
    phonetic_uk: "əˈɡriːmənt", 
    definition: "协议，同意", 
    example_en: "They reached a mutual agreement after hours of negotiation.", 
    example_zh: "经过数小时的谈判，他们达成了共同协议。" 
  },
  { 
    word: "Assurance", 
    phonetic_us: "əˈʃʊrəns", 
    phonetic_uk: "əˈʃʊərəns", 
    definition: "保证，信心", 
    example_en: "The sales manager gave his assurance that the project would be on time.", 
    example_zh: "销售经理保证项目会准时完成。" 
  },
  { 
    word: "Cancellation", 
    phonetic_us: "ˌkænsəˈleɪʃn", 
    phonetic_uk: "ˌkænsəˈleɪʃn", 
    definition: "取消", 
    example_en: "The cancellation of the order resulted in a heavy loss.", 
    example_zh: "订单的取消导致了严重的损失。" 
  },
  { 
    word: "Determine", 
    phonetic_us: "dɪˈtɜːrmɪn", 
    phonetic_uk: "dɪˈtɜːmɪn", 
    definition: "决定，判定", 
    example_en: "It's difficult to determine the exact cause of the problem.", 
    example_zh: "很难确定问题的确切原因。" 
  },
  { 
    word: "Engage", 
    phonetic_us: "ɪnˈɡeɪdʒ", 
    phonetic_uk: "ɪnˈɡeɪdʒ", 
    definition: "参与，雇佣", 
    example_en: "The firm decided to engage a legal consultant.", 
    example_zh: "公司决定聘请一位法律顾问。" 
  },
  { 
    word: "Establish", 
    phonetic_us: "ɪˈstæblɪʃ", 
    phonetic_uk: "ɪˈstæblɪʃ", 
    definition: "建立，创立", 
    example_en: "They hope to establish a new branch in Tokyo.", 
    example_zh: "他们希望在东京建立一个新的分公司。" 
  },
  { 
    word: "Obligate", 
    phonetic_us: "ˈɑːblɪɡeɪt", 
    phonetic_uk: "ˈɒblɪɡeɪt", 
    definition: "使负义务", 
    example_en: "The contract obligates the firm to complete the work within a year.", 
    example_zh: "合同规定公司必须在一年内完成工作。" 
  },
  { 
    word: "Party", 
    phonetic_us: "ˈpɑːrti", 
    phonetic_uk: "ˈpɑːti", 
    definition: "当事人，一方", 
    example_en: "The third party involved in the deal remains anonymous.", 
    example_zh: "参与这笔交易的第三方仍然匿名。" 
  },
  { 
    word: "Provision", 
    phonetic_us: "prəˈvɪʒn", 
    phonetic_uk: "prəˈvɪʒn", 
    definition: "条款，准备", 
    example_en: "Under the provisions of the law, we are entitled to a refund.", 
    example_zh: "根据法律规定，我们有权要求退款。" 
  },
  { 
    word: "Resolve", 
    phonetic_us: "rɪˈzɑːlv", 
    phonetic_uk: "rɪˈzɒlv", 
    definition: "解决，决定", 
    example_en: "The mediator helped them resolve their dispute.", 
    example_zh: "调解人帮助他们解决了争端。" 
  },
  { 
    word: "Specific", 
    phonetic_us: "spəˈsɪfɪk", 
    phonetic_uk: "spəˈsɪfɪk", 
    definition: "具体的，明确的", 
    example_en: "Please be more specific about your requirements.", 
    example_zh: "请更具体地说明您的要求。" 
  },
  { 
    word: "Attract", 
    phonetic_us: "əˈtrækt", 
    phonetic_uk: "əˈtrækt", 
    definition: "吸引", 
    example_en: "The new ad campaign is designed to attract younger customers.", 
    example_zh: "新的广告活动旨在吸引年轻顾客。" 
  },
  { 
    word: "Consume", 
    phonetic_us: "kənˈsuːm", 
    phonetic_uk: "kənˈsjuːm", 
    definition: "消耗，消费", 
    example_en: "The new printer consumes less ink than the old one.", 
    example_zh: "新打印机比旧打印机消耗更少的墨水。" 
  },
  { 
    word: "Convince", 
    phonetic_us: "kənˈvɪns", 
    phonetic_uk: "kənˈvɪns", 
    definition: "说服，使确信", 
    example_en: "He managed to convince the board to invest in the project.", 
    example_zh: "他成功地说服了董事会投资该项目。" 
  },
  { 
    word: "Currently", 
    phonetic_us: "ˈkɜːrəntli", 
    phonetic_uk: "ˈkʌrəntli", 
    definition: "当前，目前", 
    example_en: "We are currently reviewing our marketing strategy.", 
    example_zh: "我们目前正在审查我们的营销策略。" 
  },
  { 
    word: "Inspiration", 
    phonetic_us: "ˌɪnspəˈreɪʃn", 
    phonetic_uk: "ˌɪnspəˈreɪʃn", 
    definition: "灵感", 
    example_en: "The designer found inspiration in traditional Japanese art.", 
    example_zh: "设计师从日本传统艺术中汲取了灵感。" 
  },
  { 
    word: "Strategy", 
    phonetic_us: "ˈstrætədʒi", 
    phonetic_uk: "ˈstrætədʒi", 
    definition: "策略", 
    example_en: "We need a long-term strategy for growth.", 
    example_zh: "我们需要一个长期的增长策略。" 
  },
  { 
    word: "Accommodate", 
    phonetic_us: "əˈkɑːmədeɪt", 
    phonetic_uk: "əˈkɒmədeɪt", 
    definition: "容纳，适应", 
    example_en: "The hotel can accommodate up to 500 guests.", 
    example_zh: "这家酒店最多可容纳 500 名客人。" 
  },
  { 
    word: "Applicant", 
    phonetic_us: "ˈæplɪkənt", 
    phonetic_uk: "ˈæplɪkənt", 
    definition: "申请人", 
    example_en: "There were over 50 applicants for the job.", 
    example_zh: "这个职位有 50 多名申请人。" 
  },
  { 
    word: "Candidate", 
    phonetic_us: "ˈkændɪdeɪt", 
    phonetic_uk: "ˈkændɪdeɪt", 
    definition: "候选人", 
    example_en: "She is a strong candidate for the promotion.", 
    example_zh: "她是晋升的有力候选人。" 
  },
  { 
    word: "Investment", 
    phonetic_us: "ɪnˈvestmənt", 
    phonetic_uk: "ɪnˈvestmənt", 
    definition: "投资", 
    example_en: "Real estate is generally considered a safe investment.", 
    example_zh: "房地产通常被认为是一种安全的投资。" 
  },
  { 
    word: "Transaction", 
    phonetic_us: "trænˈzækʃn", 
    phonetic_uk: "trænˈzækʃn", 
    definition: "交易", 
    example_en: "All online transactions are encrypted for security.", 
    example_zh: "所有在线交易都经过加密以确保安全。" 
  },
  { 
    word: "Agenda", 
    phonetic_us: "əˈdʒendə", 
    phonetic_uk: "əˈdʒendə", 
    definition: "议程", 
    example_en: "The first item on the agenda is the budget.", 
    example_zh: "议程的第一项是预算。" 
  },
  { 
    word: "Collaborate", 
    phonetic_us: "kəˈlæbəreɪt", 
    phonetic_uk: "kəˈlæbəreɪt", 
    definition: "合作", 
    example_en: "The two companies collaborated on the new product design.", 
    example_zh: "两家公司在产品设计上进行了合作。" 
  },
  { 
    word: "Negotiate", 
    phonetic_us: "nɪˈɡoʊʃieɪt", 
    phonetic_uk: "nɪˈɡəʊʃieɪt", 
    definition: "谈判", 
    example_en: "We managed to negotiate a better deal.", 
    example_zh: "我们成功地谈成了一笔更好的交易。" 
  },
  { 
    word: "Destination", 
    phonetic_us: "ˌdestɪˈneɪʃn", 
    phonetic_uk: "ˌdestɪˈneɪʃn", 
    definition: "目的地", 
    example_en: "Paris is a popular tourist destination.", 
    example_zh: "巴黎是一个热门的旅游目的地。" 
  },
  { 
    word: "Reservation", 
    phonetic_us: "ˌrezərˈveɪʃn", 
    phonetic_uk: "ˌrezəˈveɪʃn", 
    definition: "预订", 
    example_en: "We have a reservation for a table for four.", 
    example_zh: "我们预订了一张四人桌。" 
  },
  { 
    word: "Quality control", 
    phonetic_us: "ˈkwɑːləti kənˈtroʊl", 
    phonetic_uk: "ˈkwɒləti kənˈtrəʊl", 
    definition: "质量控制", 
    example_en: "Strict quality control measures are in place.", 
    example_zh: "严格的质量控制措施已经到位。" 
  },
  { 
    word: "Warranty", 
    phonetic_us: "ˈwɔːrənti", 
    phonetic_uk: "ˈwɒrənti", 
    definition: "保修期", 
    example_en: "The refrigerator comes with a two-year warranty.", 
    example_zh: "这台冰箱有两年的保修期。" }
];
