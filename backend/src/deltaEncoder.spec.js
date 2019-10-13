const { compress, decompress } = require("./deltaEncoder");

describe("Delta encoder tests", () => {
  describe("compress", () => {
    it("should compress string", () => {
      const stringToCompress = `myxa
myxophyta
myxopod
nab
nabbed
nabbing
nabit
nabk
nabob
nacarat
nacelle`;

      const result = compress(stringToCompress);

      expect(result).toMatchSnapshot();
    });
  });

  describe("decompress", () => {
    it("should decompress string", () => {
      const stringToDecompress = `0 myxa
3 ophyta
5 od
0 nab
3 bed
4 ing
3 it
3 k
3 ob
2 carat
3 elle`;

      const result = decompress(stringToDecompress);
      expect(result).toMatchSnapshot();
    });
  });
});
