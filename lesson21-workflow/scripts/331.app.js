'use strict';
(self.webpackChunklesson21_javascript_tooling =
	self.webpackChunklesson21_javascript_tooling || []).push([
	[331],
	{
		331: (t, e, s) => {
			s.r(e), s.d(e, { Tooltip: () => o });
			class o extends class {
				constructor(t, e = !1) {
					(this.hostElement = t ? document.getElementById(t) : document.body),
						(this.insertBefore = e);
				}
				detach() {
					this.element && this.element.remove();
				}
				attach() {
					this.hostElement.insertAdjacentElement(
						this.insertBefore ? 'afterbegin' : 'beforeend',
						this.element
					);
				}
			} {
				constructor(t, e, s) {
					super(s), (this.closeNotifier = t), (this.text = e), this.create();
				}
				closeTooltip = () => {
					this.detach(), this.closeNotifier();
				};
				create() {
					const t = document.createElement('div');
					t.className = 'card';
					const e = document.getElementById('tooltip'),
						s = document.importNode(e.content, !0);
					(s.querySelector('p').textContent = this.text), t.append(s);
					const o = this.hostElement.offsetLeft + 20,
						n =
							this.hostElement.offsetTop +
							this.hostElement.clientHeight -
							this.hostElement.parentElement.scrollTop -
							10;
					(t.style.position = 'absolute'),
						(t.style.left = o + 'px'),
						(t.style.top = n + 'px'),
						t.addEventListener('click', this.closeTooltip),
						(this.element = t);
				}
			}
		},
	},
]);
//# sourceMappingURL=331.app.js.map
